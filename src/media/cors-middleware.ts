/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 9/1/2020
 * Time: 4:05 PM
 */

export function corsMiddleware(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
