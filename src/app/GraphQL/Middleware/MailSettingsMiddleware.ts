/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import { MiddlewareInterface, NextFn, ResolverData } from '@tngraphql/graphql';
import * as _ from 'lodash';
import Arr from '../../../lib/Arr';
import { ConfigOptions } from '../../../lib/ConfigOptions';
import { Application } from '@tngraphql/illuminate';
import { Repository } from '@tngraphql/illuminate/dist/Contracts/Config/Repository';

export class MailSettingsMiddleware implements MiddlewareInterface<{ app: Application }> {
    public async handle(data, next: NextFn, args: any): Promise<any> {

        if ( ! ['Query', 'Mutation', 'Subscription'].includes(data.info.parentType.toString()) ) {
            return next();
        }

        const options: any = await ConfigOptions.getOptions();

        const app: Application = data.context.app;

        app.make<Repository>('config').set('mail.mailers.smtp', {
            transport: 'smtp',
            host: options.SMTPHost,
            port: options.SMTPPort,
            secure: options.SMTPEncryption === 'SSL',
            auth: {
                user: options.SMTPUsername,
                pass: options.SMTPPassword
            }
        });

        return next();
    }


    public transform(target: Function, orders: any): any[] {
        return Arr.wrap(orders).map(sortBy => {
            return _.transform(sortBy || {}, (result, value, key: string) => {
                const resolveFn = target.prototype[`resolve${ _.upperFirst(key) }`];
                if ( typeof resolveFn === 'function' ) {
                    result[resolveFn(value)] = value;
                } else {
                    result[key] = value;
                }
            }, {});
        });
    }
}