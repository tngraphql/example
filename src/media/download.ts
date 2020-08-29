import {Application} from "@tngraphql/illuminate";
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const md5 = require('md5');
const fileUpload = require('express-fileupload');
const { join, basename } = require('path');
const quality = 50;
const cors = require('cors');
const folderUploads = Application.getInstance<Application>().basePath('../uploads/');

router.use('/download', cors);

// router.all('/download', (req, res) => {
//     const authorization = req.query.token;
//     if ( ! authorization ) {
//         res.status(410).send('Code Expired');
//     }
//
//     const token = authorization.replace(/^(Bearer\s)/g, '');
//
//     const cert = fs.readFileSync(Application.getInstance<Application>().basePath('oauth-public.key')).toString('UTF-8');
//
//     try {
//         const verify = jwt.verify(token, cert, { algorithm: 'RS256' });
//
//         const filename = Crypt.decryptString(verify.file);
//
//         return res.download(folderUploads + filename, filename);
//     } catch (e) {
//         res.status(410).send('Code Expired');
//     }
// });

export const download = router;
