/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 8:56 PM
 */

export class Resource {
    public static delete(data, i18n) {
        if ( data ) {
            return {
                status: true,
                message: i18n.__('Delete success.'),
                data
            };
        } else {
            return {
                status: false,
                message: i18n.__('Delete error.')
            };
        }
    }
}
