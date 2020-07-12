import {ExistsRule, UniqueRule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rules";

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

export function empty(mixedVar) {
    const emptyValues = [undefined, null, false, 0, '', '0'];

    if ( emptyValues.indexOf(mixedVar) !== -1 ) {
        return true;
    }

    if (Array.isArray(mixedVar)) {
        if (!mixedVar.length) {
            return true;
        }

        return !mixedVar.some(x => !empty(x));
    }

    if ( typeof mixedVar === 'object' ) {
        return !Object.keys(mixedVar).length;
    }

    return false;
}

export function cloneObject(v) {
    try {
        return JSON.parse(JSON.stringify(v));
    } catch (e) {
        console.log(e);
        return {};
    }
}

export function ruleToString(v) {
    for(let i in v) {
        v[i] = v[i].map(x => {
            if (x instanceof UniqueRule) {
                return 'unique';
            } else if (x instanceof ExistsRule) {
                return 'exists';
            }
            return x;
        });
    }
    return v;
}