/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/12/2020
 * Time: 9:10 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ResolverData } from '@tngraphql/graphql';
import {getMetadataStorage} from "@tngraphql/graphql/dist/metadata/getMetadataStorage";
import {Application} from "@tngraphql/illuminate";
import {SchemaGenerator} from "@tngraphql/graphql/dist/schema/schema-generator";
import * as _ from 'lodash';

export class Filter {
    public app;

    constructor() {
        this.app = Application.getInstance();
    }

    public async handle (
        data: ResolverData,
        next: () => Promise<void>,
        allowedRoles: string[],
    ) {
        console.log('filter');
        await next()
    }
}

function f(route, handlers, target) {
    const handler = handlers.find(handler => {
        return handler.methodName === route.action && handler.target === target;
    });

    if ( handler ) {
        return {
            ...handler,
            middlewares: [...handler.middlewares, ...route.middleware],
            target: route.target
        };
    }

    let superResolver = Object.getPrototypeOf(target);

    if ( superResolver.prototype ) {
        return f(route, handlers, superResolver);
    }
    return false;
}