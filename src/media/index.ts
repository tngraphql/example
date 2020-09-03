/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/28/2020
 * Time: 9:13 PM
 */
import { Application } from '@tngraphql/illuminate';

const express = require('express');
const router = express.Router();

const app = Application.getInstance<Application>();

import { upload } from './upload';
import { downloadMedia } from './downloadMedia';

router.use(upload);
router.use(downloadMedia);

router.get('/template/email', async (req, res) => {
    const view = app.make('view');

    const data: any = {
        actionUrl: 'email@gmail.com',
    };
    data.introLines = [
        'Xin chào bạn,',
        'You are receiving this email because we received a password reset request for your account.'
    ];
    data.outroLines = [
        `This password reset link will expire in ${ app.make('config').get('auth.passwords.expire') } minutes.`,
        'If you did not request a password reset, no further action is required.',
    ]


    const html = await view.render('password-reset', data);


    res.send(html);
})

export const media = router;