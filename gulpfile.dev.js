const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', {
    "sourceMap": true,
});
const p = require('path');
const spawn = require('child_process').spawn;
const fs = require('fs');


let node;

const destFolder = 'dist';

function copyFile() {
    return gulp.src([
        'src/**/*.html',
        // 'src/**/*.json',
        // 'src/**/*.js',
    ], { since: gulp.lastRun(copyFile) })
        .pipe(gulp.dest(destFolder));
}

function build() {
    return gulp.src([
        'src/**/*.ts',
    ], { since: gulp.lastRun(build) })
        .pipe(tsProject())
        .pipe(gulp.dest(destFolder))
        .once('end', function() {
            server();
        });
}

function server() {
    if ( node ) node.kill()
    node = spawn('node', [destFolder + '/index.js', '--max-old-space-size=6144'], { stdio: 'inherit' })
    node.on('close', function(code) {
        if ( code === 8 ) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
}

// gulp.task('default', copyFile);
gulp.task('copy-file', copyFile);
gulp.task('build', build);

gulp.task('default', gulp.series([
    gulp.parallel('copy-file'),
    gulp.parallel('build')
], server));

const watcher = gulp.watch(['src/**'], build);
gulp.watch(['src/**'], copyFile);

watcher.on('change', function(path, stats) {
    console.log(`File ${ path } was changed`);
});

process.on('exit', function() {
    if ( node ) node.kill()
});
