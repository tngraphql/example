/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/29/2020
 * Time: 10:53 AM
 */
import {Application} from "@tngraphql/illuminate";
const fs = require('fs');
const jwt = require('jsonwebtoken');

export function authMiddleware(req, res, next) {
    if ( ! req.query ) {
        return res.json({
            error: true,
            message: 'Error when downloading files!',
            data: [],
            code: null
        });
    }

    const authorization = req.query.token;
    if ( ! authorization ) {
        res.status(410).send('Code Expired');
    }

    const token = authorization.replace(/^(Bearer\s)/g, '');

    const cert = fs.readFileSync(Application.getInstance<Application>().basePath('./auth-public.key')).toString('UTF-8');

    try {
        const verify = jwt.verify(token, cert, {algorithm: 'RS256'});
    }catch (e) {
        return res.status(410).send('Unauthenticated');
    }
    next();
}