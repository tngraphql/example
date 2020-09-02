import {Application} from "@tngraphql/illuminate";
import MediaModel from "../app/Features/Media/MediaModel";
import {authMiddleware} from "./auth-middleware";
import {corsMiddleware} from "./cors-middleware";

const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const md5 = require('md5');
const fileUpload = require('express-fileupload');
const { join, basename } = require('path');
const cors = require('cors');
const archiver = require('archiver');
const _ = require('lodash');

const quality = 50;

const folderUploads = Application.getInstance<Application>().basePath('../uploads/');

router.use('/media/download',corsMiddleware);
router.use('/media/download', authMiddleware);

router.all('/media/download', async (req, res) => {
    try {
        const data = await MediaModel.query()
            .whereIn('id', req.query.selected.map(x => x.id))
            .exec();
        let listFile = [];

        if ( data.length ) {
            listFile = data.filter(x => x.mineType !== 'folder');

            const d = await Promise.all(data.filter(x => x.mineType === 'folder')
                                            .map(x => {
                                                let f = '';

                                                if ( x.folderName ) {
                                                    f = [x.folderName, x.title].join(' / ');
                                                } else {
                                                    f = x.title;
                                                }

                                                return MediaModel.query()
                                                    .allFolder(f)
                                                    .where('mineType', '<>', `folder`)
                                                    .exec();
                                            }))
                                   .then(data => _.flattenDepth(data));
            listFile = _.concat(d.filter(x => x.src), listFile);
        }

        if ( ! listFile.length ) {
            return res.json({
                error: true,
                message: 'Error when downloading files!',
                data: [],
                code: null
            });
        }

        if ( listFile.length === 1 ) {
            const ext = listFile[0].src.split('.').pop();
            const oldext = listFile[0].title.split('.').pop();
            if ( ext === oldext ) {
                return res.download(folderUploads + decodeURI(listFile[0].src), listFile[0].title);
            }

            return res.download(folderUploads + decodeURI(listFile[0].src), listFile[0].title + '.' + ext);
        }

        // const output = fs.createWriteStream('download-2020-07-06-08-24-12.zip');
        const archive = archiver('zip', {
            gzip: true,
            zlib: { level: 9 } // Sets the compression level.
        });

        archive.on('error', function(err) {
            throw err;
        });

        res.attachment('download-2020-07-06-08-24-12.zip');

        // pipe archive data to the output file
        archive.pipe(res);

        // append files
        listFile.forEach(item => {
            const ext = item.src.split('.').pop();
            const oldExt = item.title.split('.').pop();
            const name = ext === oldExt ? item.title : item.title + '.' + ext;

            if ( item.folderName ) {
                const a = item.folderName.split('/').map(x => x.trim());
                a.push(name)
                archive.file(folderUploads + decodeURI(item.src), { name: a.join('/') });
            } else {
                archive.file(folderUploads + decodeURI(item.src), { name });
            }
        });

        // Wait for streams to complete
        archive.finalize();

        return;
    } catch (e) {
        console.log(e);
        res.status(410).send('Code Expired');
    }
});

export const downloadMedia = router;
