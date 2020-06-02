/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 8:10 AM
 */

export const AsyncFunction = (async () => {}).constructor;

const _ = require('lodash');

export function tap(value: any, callback?: (value: any) => any): Promise<any> | any {
    if (!callback) {
        return value;
    }

    if (callback.constructor === AsyncFunction) {
        return callback(value).then(() => value);
    }

    const r = callback(value);

    if (r.constructor === Promise) {
        return r.then(() => value);
    }

    return value;
}

function customizer(objValue, srcValue) {
    if ( _.isArray(objValue) ) {
        return _.uniq(objValue.concat(srcValue));
    }
    if ( _.isObject(objValue) ) {
        return { ...objValue, ...srcValue };
    }

    return srcValue;
}

export function merge(...args) {
    return _.mergeWith(...args, customizer);
}