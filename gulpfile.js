const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const p = require('path');
const spawn = require('child_process').spawn;
const fs = require('fs');

let destFolder = 'dist';

if ( process.env.OUT_DIR ) {
    destFolder = process.env.OUT_DIR;
}

function copyFile() {
    return gulp.src([
        'src/**/*.html'
    ])
        .pipe(gulp.dest(destFolder));
}

function build() {
    return gulp.src([
        'src/**/*.ts',
        // 'src/**/*.js',
    ])
        .pipe(tsProject()) // config ts
        .pipe(gulp.dest(destFolder));
}

gulp.task('copy-file', copyFile);

// Run gulp
gulp.task('default', gulp.series([
    gulp.parallel('copy-file'),
], build));