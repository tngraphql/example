/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/21/2020
 * Time: 9:09 AM
 */

import {Env} from "@tngraphql/illuminate/dist/Support/Env";

export = {
    default: 'smtp',

    mailers: {
        smtp: {
            transport: 'smtp',
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: Env.get('MAIL_USER', 'ek2dpcz6ty2domd6@ethereal.email'), // generated ethereal user
                pass: Env.get('MAIL_PASS', 'WTJY4U17962asHPgPV')  // generated ethereal password
            }
        }
    },

    from: {
        address: Env.get('MAIL_FROM_ADDRESS', 'nguyenpl117@gmail.com'),
        name: Env.get('MAIL_FROM_NAME', '')
    }
}