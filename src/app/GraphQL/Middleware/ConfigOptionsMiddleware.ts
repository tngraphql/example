/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/26/2020
 * Time: 5:47 PM
 */
import { PrefixingKeyValueCache } from 'apollo-server-caching';
import {MiddlewareInterface, NextFn} from "@tngraphql/graphql";
import {ConfigOptions} from "../../../lib/ConfigOptions";
import { InMemoryLRUCache } from 'apollo-server-caching';

export class ConfigOptionsMiddleware implements MiddlewareInterface<{ lang: any }> {
    public async handle({context, info}, next: NextFn, args: any): Promise<any> {
        if (!['Query', 'Mutation'].includes(info.parentType.toString())) {
            return next();
        }

        // await ConfigOptions.setCacheControl();
        await ConfigOptions.clearCache();
        await ConfigOptions.init();

        await next();
    }
}