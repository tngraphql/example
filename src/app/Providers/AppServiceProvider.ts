/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/26/2020
 * Time: 7:51 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ServiceProvider } from '@tngraphql/illuminate';
import {Database} from "@tngraphql/lucid";
import {DateTime} from "luxon";
import {Relation} from "@tngraphql/lucid/build/src/Orm/Relations/Base/Relation";
import {PostModel} from "../Features/Post/PostModel";
import {TransactionClient} from "@tngraphql/lucid/build/src/TransactionClient";
import {ProductMasterModel} from "../Features/Product/Models/ProductMasterModel";
import { Env as EnvFactory } from '@adonisjs/env/build/src/Env';

EnvFactory.prototype.get = function (key, defaultValue) {
    const value = process.env[key];
    if (value === undefined || value === '') {
        return defaultValue;
    }
    return this.castValue(value);
}

export class AppServiceProvider extends ServiceProvider {
    register(): void {
        DateTime.prototype.toISO = function (opts = {suppressMilliseconds: true}) {
            if (!this.isValid) {
                return null;
            }

            return `${this.toISODate(opts)}T${this.toISOTime(opts)}`;
        }

        TransactionClient.defaultMaxListeners = 30;

        Relation.morphMap({
            'post': () => PostModel,
            'product': () => ProductMasterModel
        })
    }

    boot(): void {
        const cls = require('continuation-local-storage');
        const namespace = cls.createNamespace('my-very-own-namespace');

        Database._cls = namespace;
    }
}
