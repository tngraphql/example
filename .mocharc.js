'use strict';
/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/2/2020
 * Time: 9:27 AM
 */

module.exports = {
    timeout: 25000,
    require: ['ts-node/register','reflect-metadata'],
    file: './init.ts',
    exit: true,
    recursive: ['tests/**/*.spec.ts']
}