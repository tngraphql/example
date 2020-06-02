/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/21/2020
 * Time: 9:09 AM
 */

export = {
    default: 'smtp',
    mailers: {
        smtp: {
            transport: 'smtp',
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'ek2dpcz6ty2domd6@ethereal.email', // generated ethereal user
                pass: 'WTJY4U17962asHPgPV'  // generated ethereal password
            }
        }
    }
}