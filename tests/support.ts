/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/27/2020
 * Time: 3:40 PM
 */

import 'reflect-metadata';
import * as chai from 'chai';
chai.use(require('chai-as-promised'));
const expect = chai.expect;
chai.config.includeStack = true;
chai.should();
const log = console.log;
function trace() {
    try {
        throw new Error();
    } catch (e) {
        log.apply(log, [e.stack.split('\n')[2].trim(),'\n', ...arguments]);
    }
}

console.log = trace;