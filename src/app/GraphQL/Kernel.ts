/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/13/2020
 * Time: 2:08 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {Application, Service} from '@tngraphql/illuminate';
import {Acl} from './Middleware/Acl';
import {GraphQLKernel} from '@tngraphql/illuminate/dist/Foundation/GraphQL/GraphQLKernel'
import {Authenticate} from "@tngraphql/auth/dist/src/Middleware/Authenticate";
import {CanMiddleware} from "@tngraphql/guard/dist/src/Middleware/CanMiddleware";
import {SortByMiddleware} from "./Middleware/SortByMiddleware";
import {LanguageMiddleware} from "./Middleware/LanguageMiddleware";
import {ConfigOptionsMiddleware} from "./Middleware/ConfigOptionsMiddleware";
import {DephLimitMiddleware} from "./Middleware/DephLimitMiddleware";
import {MailSettingsMiddleware} from "./Middleware/MailSettingsMiddleware";

@Service()
export class Kernel extends GraphQLKernel {
    /**
     * global middleware
     */
    protected middleware = [
        DephLimitMiddleware,
        SortByMiddleware,
        ConfigOptionsMiddleware,
        LanguageMiddleware,
        MailSettingsMiddleware
    ];

    /**
     * Register name middleware
     */
    protected routeMiddleware = {
        acl: Acl,
        auth: Authenticate,
        can: CanMiddleware
    }

    protected nullableByDefault = true;

    public _validationRules = [
        // function() {
        //     return depthLimit(this.app.config.get('app').depthLimit)
        // }
    ];

    public plugins: any[] = [];

    constructor(app: Application) {
        super(app);
    }

    public validationRules() {
        return this._validationRules.map(x => {
            if (typeof x === "function") {
                return x.bind(this)();
            }
            return x;
        })
    }
}
