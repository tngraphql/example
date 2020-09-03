/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 8:10 AM
 */
import { ExistsRule, UniqueRule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rules';

const htmlToText = require('html-to-text');
const xss = require('xss');
const { parse } = require('himalaya');

export const AsyncFunction = (async () => {
}).constructor;

const _ = require('lodash');

export function tap(value: any, callback?: (value: any) => any): Promise<any> | any {
    if ( ! callback ) {
        return value;
    }

    if ( callback.constructor === AsyncFunction ) {
        return callback(value).then(() => value);
    }

    const r = callback(value);

    if ( r.constructor === Promise ) {
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

    if ( Array.isArray(mixedVar) ) {
        if ( ! mixedVar.length ) {
            return true;
        }

        return ! mixedVar.some(x => ! empty(x));
    }

    if ( typeof mixedVar === 'object' ) {
        return ! Object.keys(mixedVar).length;
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
    for( let i in v ) {
        v[i] = v[i].map(x => {
            if ( x instanceof UniqueRule ) {
                return 'unique';
            } else if ( x instanceof ExistsRule ) {
                return 'exists';
            }
            return x;
        });
    }
    return v;
}

export function validHTML(source) {
    // return html;
    xss.whiteList.figure = [];
    xss.whiteList.figcaption = [];
    xss.whiteList.iframe = [
        'width',
        'height',
        'src',
        'allowfullscreen',
        'frameborder',
        'allow',
        'sandbox',
        'align'
    ];
    xss.whiteList.picture = [];
    xss.whiteList.source = ['src', 'srcset', 'media', 'sizes', 'type'];
    xss.whiteList.img.push.apply(xss.whiteList.img, ['crossorigin', 'ismap', 'longdesc', 'srcset', 'usemap']);
    xss.whiteList.progress = ['max', 'value'];
    xss.whiteList.q = ['cite'];
    xss.whiteList.rp = [];
    xss.whiteList.rt = [];
    xss.whiteList.ruby = [];
    xss.whiteList.samp = [];
    xss.whiteList.strike = [];
    xss.whiteList.summary = [];
    xss.whiteList.time = ['datetime'];
    xss.whiteList.track = ['default', 'kind', 'label', 'src', 'srclang'];
    xss.whiteList.var = [];
    xss.whiteList.wbr = [];
    for( const i in xss.whiteList ) {
        xss.whiteList[i].push.apply(xss.whiteList[i], ['id', 'class', 'style', 'width', 'height', 'src', 'title']);
    }
    xss.whiteList.body = ['id', 'class'];
    const html = xss(source, {
        onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
            if ( name.substr(0, 5) === 'data-' ) {
                // escape its value using built-in escapeAttrValue function
                return name + '="' + xss.escapeAttrValue(value) + '"';
            }
        }
    });
    return html;
}

export function htmlField(html, args) {

    html = html || '';

    if ( ! html ) {
        return '';
    }

    const text = htmlToText.fromString(html, { wordwrap: args.maxLength });

    let safeText = text;

    if ( args.maxLength && args.maxLength > 0 ) {
        safeText = text.split('\n')[0];
    }

    switch (args.format) {
    case 'HTML':
        if ( safeText !== text ) {
            // Text was truncated, so just show what's safe:
            return safeText;
        } else {
            return html;
        }
    case 'TEXT':
        return safeText;
    default:
        return html;
    }
}

export function convertHtmlToJson(html) {
    if ( ! html ) {
        return '';
    }
    const json = parse(html.trim());

    const data: any = {};
    for( const item of json ) {
        if ( ! item.attributes ) {
            continue;
        }
        const attr: any = {};
        for( const c of item.attributes ) {
            attr[c.key] = c.value;
        }
        const t = item.children.find(x => x.type === 'text');
        if ( t ) {
            if ( item.tagName === 'script' ) {
                attr.innerHTML = t.content;
            } else if ( item.tagName === 'style' ) {
                attr.cssText = t.content;
            } else {
                attr[t.type] = t.content;
            }
        }

        if ( data[item.tagName] ) {
            data[item.tagName].push(attr);
        } else {
            data[item.tagName] = [attr];
        }
    }

    return data;
}

export function converBoolean(value: any, valueTrue: any = 1, valueFalse: any = 0) {
    if ( value === true || value === valueTrue ) {
        return valueTrue;
    } else if ( value === false || value === valueFalse ) {
        return valueFalse;
    }

    return valueFalse;
}