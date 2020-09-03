/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 1:59 PM
 */
import * as _ from 'lodash';
import Arr from './Arr';

const slug = require('sluglife');
const uuid = require('uuid');

export class Str {
    public static slug(str: string, options: { [key: string]: any } = { lower: true }): string {
        if ( ! str ) {
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
        if ( val === null || typeof val === 'undefined' ) {
            return val;
        }
        return String(val);
    }

    /**
     *
     * @return {string}
     */
    public static uuid(): string {
        return uuid.v4();
    }

    public static trimUrl(x) {
        return x.replace(/^\/+|\/+$/gm, '');
    }

    public static async radomString(length = 16) {
        let str: string = '';

        while ( str.length < length ) {
            const size = length - str.length;
            const bytes = await this.randomBytes(size);

            str += bytes.toString('base64').replace(/\/|\+|\=/g, '').substr(0, size);
        }

        return str;
    }

    public static async randomBytes(size): Promise<Buffer> {
        const a: Promise<Buffer> = new Promise((resolve) => {
            require('crypto').randomBytes(size, function(err, buffer) {
                resolve(buffer);
            });
        });

        return a;
    }

    public static is(pattern: string | string[], value): boolean {
        const patterns = Arr.wrap(pattern);
        if ( ! patterns.length ) {
            return false;
        }

        for( let pattern of patterns ) {
            pattern = _.escapeRegExp(pattern);

            pattern = pattern.replace(/\\\*/g, '.*');

            const regex = new RegExp(`^${ pattern }$`);

            if ( regex.test(value) ) {
                return true
            }
        }

        return false;
    }
}