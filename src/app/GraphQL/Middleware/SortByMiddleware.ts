/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import {MiddlewareInterface, NextFn, ResolverData} from "@tngraphql/graphql";
import {getMetadataStorage} from "@tngraphql/graphql/dist/metadata/getMetadataStorage";
import * as _ from "lodash";
import Arr from "../../../lib/Arr";

export class SortByMiddleware implements MiddlewareInterface {
    public async handle(data: ResolverData<{}>, next: NextFn, args: any): Promise<any> {

        if (!['Query', 'Mutation', 'Subscription'].includes(data.info.parentType.toString())) {
            return next();
        }

        const argsType: any = data.resolverMetadata.params.find(x => x.kind === 'args');

        if (!argsType) {
            return next();
        }

        const sortBy = getMetadataStorage()
            .argumentTypes.find(x => x.target === argsType.getType())
            .fields.find(x => x.name === 'sortBy');

        if (!sortBy) {
            return next();
        }

        const fn: any = sortBy.getType();

        data.args.order = this.transform(fn, data.args.sortBy);

        await next();
    }


    public transform(target: Function, orders: any): any[] {
        return Arr.wrap(orders).map(sortBy => {
            return _.transform(sortBy || {}, (result, value, key: string) => {
                const resolveFn = target.prototype[`resolve${_.upperFirst(key)}`];
                if (typeof resolveFn === "function") {
                    result[resolveFn(value)] = value;
                } else {
                    result[key] = value;
                }
            }, {});
        });
    }
}