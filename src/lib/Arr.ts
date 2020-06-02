/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 4:04 PM
 */
export default class Arr {
    public static array_wrap(value, split = ''): any[] {
        const list = [void (0), null, undefined, ''];

        if ( list.includes(value) ) {
            return [];
        }

        return ! Array.isArray(value) ? split ? value.split(split) : [value] : value;
    }
}
