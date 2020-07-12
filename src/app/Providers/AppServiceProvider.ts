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


export class AppServiceProvider extends ServiceProvider {
    register(): void {

    }

    boot(): void {
        const cls = require('continuation-local-storage');
        const namespace = cls.createNamespace('my-very-own-namespace');

        Database._cls = namespace;
    }
}
