import * as DepreciatedJimp from 'jimp';
import MediaModel from "../app/Features/Media/MediaModel";
import {Str} from "../lib/Str";
import {authMiddleware} from "./auth-middleware";
import * as path from "path";
import {corsMiddleware} from "./cors-middleware";

const express = require('express');
const fs = require('fs');
const Jimp = require('jimp');
// const sharp = require('sharp');
const router = express.Router();
const md5 = require('md5');
const fileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const { join, basename } = require('path');
const { URL } = require('url');
const quality = 50;

const folderUploads = path.join(process.cwd(), 'uploads/')

function getResizeWidthHeight(w1, h1, w2 = 800, h2 = 0) {
    if ( w1 < w2 && h1 < h2 ) {
        return {
            width: null,
            height: null
        };
    }
    if ( ! h2 ) {
        if ( w1 < w2 ) {
            return {
                width: null,
                height: null
            };
        }

        return {
            width: w2,
            height: Math.round(h1 / (w1 / w2))
        };
    }

    const w = w1 / w2;
    const h = h1 / h2;

    const width = Math.round(w1 / h);
    const height = Math.round(h1 / w);

    if ( width <= w2 && height > h2 ) {
        // Theo height
        return {
            width,
            height: h2
        };
    }
    if ( width > w2 && height <= h2 ) {
        // Theo width
        return {
            width: w2,
            height
        };
    }
    if ( width === w2 && height === h2 ) {
        // Theo width - height
        return {
            width: w2,
            height: h2
        };
    }
}

function getCropWidthHeight(w1, h1, w2 = 100, h2 = 100) {
    if ( w1 < w2 && h1 < h2 ) {
        return {
            width: null,
            height: null
        };
    }

    if ( w1 < w2 ) {
        return {
            width: w1,
            height: h2
        };
    }
    if ( h1 < h2 ) {
        return {
            width: w2,
            height: h1
        };
    }

    return {
        width: w2,
        height: h2
    };
}

async function resized(image: DepreciatedJimp, bitmap, w, h, name) {

    const { width, height } = getResizeWidthHeight(bitmap.width, bitmap.height, w, h);

    if ( ! width || ! height ) {
        return;
    }

    // sharp(bitmap.data)
    //     .resize(Number(width), Number(height))
    //     .toFile(changeName(name, width, height), console.log);
    const folder = folderUploads;
    const fileName = changeName(name, width, height);

    await image.resize(Number(width), Number(height)) // resize
               .quality(quality) // set quality
               .writeAsync(folder + fileName); // save
    return {
        'file': encodeURI(fileName.replace(/^\/images\//g, '')),
        'guid': encodeURI(getUrlImage(fileName)),
        'size': image.bitmap.data.length,
        width,
        height,
        'mime-type': image.getMIME()

    };
}

async function cropped(image: DepreciatedJimp, bitmap, w, h, name) {

    const { width, height } = getCropWidthHeight(bitmap.width, bitmap.height, w, h);

    if ( ! width || ! height ) {
        return;
    }

    const folder = folderUploads;
    const fileName = changeName(name, width, height);

    await image.cover(Number(width), Number(height)) // resize
               .quality(quality) // set quality
               .writeAsync(folder + fileName); // save

    return {
        'file': encodeURI(fileName.replace(/^\/images\//g, '')),
        'guid': encodeURI(getUrlImage(fileName)),
        'size': image.bitmap.data.length,
        'mime-type': image.getMIME(),
        width,
        height
    };
}

function changeName(name, w, h) {
    const regex = /(.*)(\.jpg|\.png|\.gif|\.jpeg|\.bmp|\.tiff)$/g;

    if ( regex.test(name) ) {
        return name.replace(regex, `$1-${ w }x${ h }$2`);
    }

    return false;
}

function getUrlImage(urlFile) {
    let url = process.env.APP_URL.replace(/\/$/g, '');

    if (/^https?:\/\/[a-z]+/g.test(url)) {
        const u = new URL(url);
        return `//${u.host}${urlFile}`;
    }

    return `//${ url }${ urlFile }`;
}

const checkSlug = function(slug) {
    return MediaModel.query()
        .where('title', slug)
        .first().then(model => {
            return model === null;
        });
};

const addNumericSuffix = function(slugValue) {
    return (function suffixHelper(slug, count) {
        const suffixedSlug = slug + '-' + count;

        return checkSlug(suffixedSlug).then(function(isUnique) {
            if ( isUnique ) {
                return suffixedSlug;
            }

            return suffixHelper(slug, count + 1);
        });
    })(slugValue, 1);
};

router.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    tempFileDir: folderUploads
}));

router.use('/media/upload', authMiddleware);
router.use('/media/upload', corsMiddleware);
router.use('/upload', corsMiddleware);

const uploadFn = (req, res) => {
    if ( Object.keys(req.files).length === 0 ) {
        return res.status(400).send('No files were uploaded.');
    }

    req.body = req.body || {};
    console.log('upload');

    const sampleFile = req.files.foo || req.files.upload;

    const regex = /(.*)(\.jpg|\.png|\.gif|\.jpeg|\.bmp|\.tiff)$/g;
    const MIME_IMAGE_BMP = 'image/bmp';
    const MIME_IMAGE_CGM = 'image/cgm';
    const MIME_IMAGE_GIF = 'image/gif';
    const MIME_IMAGE_IEF = 'image/ief';
    const MIME_IMAGE_JPEG = 'image/jpeg';
    const MIME_IMAGE_TIFF = 'image/tiff';
    const MIME_IMAGE_PNG = 'image/png';
    const ext = {
        [MIME_IMAGE_BMP]: '.bmp',
        [MIME_IMAGE_CGM]: '.cgm',
        [MIME_IMAGE_GIF]: '.gif',
        [MIME_IMAGE_JPEG]: '.jpg',
        [MIME_IMAGE_TIFF]: '.tiff',
        [MIME_IMAGE_PNG]: '.png'
    };

    if ( ! regex.test(sampleFile.name) && ext[sampleFile.mimetype] ) {
        sampleFile.name = sampleFile.name + ext[sampleFile.mimetype];
    }

    const rgmine = /(.*)(\.jpg|\.jpeg|\.png|\.gif|\.txt|\.docx|\.zip|\.mp3|\.bmp|\.csv|\.xls|\.xlsx|\.ppt|\.pptx|\.pdf|\.mp4|\.doc|\.mpga|\.wav)$/g;

    if ( ! rgmine.test(sampleFile.name) ) {
        throw new Error('Trường uploaded file phải là một tập tin có định dạng: jpg, jpeg, png, gif, txt, docx, zip, mp3, bmp, csv, xls, xlsx, ppt, pptx, pdf, mp4, doc, mpga, wav.');
    }

    const d = Str.uuid() + '-';
    const filePath = folderUploads + 'images/' + d + sampleFile.name;
    const urlFile = '/images/' + d + sampleFile.name;

    if ( ! fs.existsSync(folderUploads + 'images/') ) {
        throw new Error('No such file or directory.');
    }

    try {
        fs.accessSync(folderUploads + 'images/', fs.constants.W_OK | fs.constants.R_OK);
    } catch (e) {
        throw new Error(this.lang.t('No permission read and write file.'));
    }

    sampleFile.mv(filePath, (err) => {
        if ( err ) {
            return res.status(500).send(err);
        }

        const path = getUrlImage(urlFile);

        let slugName = sampleFile.name.split('.');
        slugName.pop();
        slugName = slugName.join('.');

        checkSlug(slugName).then(isUnique => {
            if ( isUnique ) {
                return slugName;
            }

            return addNumericSuffix(slugName);
        }).then(title => {
            if ( ! regex.test(sampleFile.name) && ! ext[sampleFile.mimetype] ) {
                MediaModel.create({
                    status: '1',
                    title,
                    guid: encodeURI(path),
                    src: encodeURI(urlFile),
                    srcMd5: md5(urlFile),
                    rootId: '0',
                    filesize: sampleFile.size,
                    mineType: sampleFile.mimetype,
                    data: JSON.stringify([]),
                    folderName: req.body.folderName || null
                }).then(x => {
                    res.json({
                        message: 'File uploaded!',
                        status: 200,
                        path: encodeURI(path),
                        uploaded: true,
                        default: encodeURI(path),
                        url: encodeURI(path)
                    });
                });

                return;
            }

            Jimp.read(sampleFile.data, async (err, image) => {
                if ( err || (['image/gif'].indexOf(image.getMIME()) !== -1) ) {
                    return res.json({
                        message: 'File uploaded!',
                        status: 200,
                        path: encodeURI(path),
                        uploaded: true,
                        default: encodeURI(path),
                        url: encodeURI(path)
                    });
                }

                const { width, height } = image.bitmap;
                let thumbnail;
                let shopThumbnail;
                let medium;
                let mediumLarge;
                let large;
                let shopCatalog;
                let shopSingle;
                try {
                    thumbnail = await cropped(image.clone(), image.bitmap, 280, 280, urlFile); // thumbnail
                    shopThumbnail = await cropped(image.clone(), image.bitmap, 100, 100, urlFile); // shop_thumbnail

                    medium = await resized(image.clone(), image.bitmap, 800, 400, urlFile); // medium
                    mediumLarge = await resized(image.clone(), image.bitmap, 768, 0, urlFile); // medium_large
                    large = await resized(image.clone(), image.bitmap, 1400, 800, urlFile); // large
                    shopCatalog = await resized(image.clone(), image.bitmap, 300, 0, urlFile); // shop_catalog
                    shopSingle = await resized(image.clone(), image.bitmap, 600, 0, urlFile); // shop_single

                    const data = {
                        width,
                        height,
                        file: encodeURI(urlFile),
                        sizes: {
                            thumbnail,
                            shopThumbnail,
                            medium,
                            mediumLarge,
                            large,
                            shopCatalog,
                            shopSingle
                        }
                    };

                    const media = await MediaModel.create({
                        status: '1',
                        title,
                        guid: encodeURI(path),
                        src: encodeURI(urlFile),
                        srcMd5: md5(urlFile),
                        rootId: '0',
                        filesize: sampleFile.size,
                        mineType: image.getMIME(),
                        data: JSON.stringify(data),
                        folderName: req.body.folderName || null
                    })

                    res.json({
                        data,
                        message: 'File uploaded!',
                        status: 200,
                        path: encodeURI(path),
                        uploaded: true,
                        default: encodeURI(path),
                        url: encodeURI(path),
                        thumbnailId: media.id
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
    });

}
router.post('/media/upload', uploadFn);
router.post('/upload', uploadFn);

const serveStatic = require('serve-static');

const apiLimiter = rateLimit({
    keyGenerator(req /*, res*/) {
        return req.ip + req.originalUrl;
    },
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 101
});

// only apply to requests that begin with /api/
router.use('/images/', apiLimiter);

router.use(express.static(folderUploads, {
    maxAge: '1d',
    setHeaders: (res, path) => {
        if ( serveStatic.mime.lookup(path) === 'text/html' ) {
            // Custom Cache-Control for HTML files
            res.setHeader('Cache-Control', 'public, max-age=0');
        }
    }
}));

export const upload = router;
