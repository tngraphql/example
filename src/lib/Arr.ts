/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 4:04 PM
 */
export default class Arr {
    public static array_wrap(value, split = ''): any[] {
        if (Array.isArray(value)) {
            return value;
        }

        const list = [void (0), null, undefined, ''];

        if ( list.includes(value) ) {
            return [];
        }

        return split ? value.split(split) : [value];
    }

    public static wrap(value, split = ''): any[] {
        return this.array_wrap(value, split);
    }
}
