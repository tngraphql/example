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

@Service()
export class Kernel extends GraphQLKernel {
    /**
     * global middleware
     */
    protected middleware = [
        SortByMiddleware,
        LanguageMiddleware
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

    constructor(app: Application) {
        super(app);

        // for (let item in this.routeMiddleware) {
        //     const md = this.routeMiddleware[item];
        //     md.prototype.app = this.app;
        // }
    }
}
