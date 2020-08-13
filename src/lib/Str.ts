/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 1:59 PM
 */
const slug = require('sluglife');

export class Str {
    public static slug(str: string, options: { [key: string]: any } = { lower: true }): string {
        if (!str) {
            return str;
        }
        return slug(str, options);
    }

    /**
     * Str.ucFirst('a nice title uses the correct ucfirst');
     * // A nice title uses the correct ucfirst
     *
     * @param {string} str
     * @return {string}
     */
    public static ucFirst(str: string): string {
        return str.replace(/^\w/, (c) => c.toUpperCase());
    }

    public static toString(val) {
        if (val === null || typeof val === "undefined") {
            return val;
        }
        return String(val);
    }
}