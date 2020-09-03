/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/29/2020
 * Time: 10:53 AM
 */
import { AuthManager } from '@tngraphql/auth/dist/src/AuthManager';
import { Application } from '@tngraphql/illuminate';
import { AuthContract } from '@tngraphql/auth/dist/src/Contract/AuthContract';

export async function authMiddleware(req, res, next) {
    req.bearerToken = () => {
        if ( req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' ) {
            return req.headers.authorization.split(' ')[1];
        } else if ( req.query && req.query.token.split(' ')[0] === 'Bearer' ) {
            return req.query.token.split(' ')[1];
        }
        return null;
    };

    if ( ! req.bearerToken() ) {
        return res.json({
            error: true,
            message: 'Error when downloading files!',
            data: [],
            code: null
        });
    }

    const manage: AuthContract = new AuthManager(Application.getInstance(), { req }) as any;

    req.auth = manage;

    if ( await manage.check() ) {
        return next();
    }
    ;

    return res.status(410).send('Unauthenticated');
}