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
import { Context } from '@tngraphql/graphql/dist/resolvers/context';

export class AppServiceProvider extends ServiceProvider {
    register(): void {
        Context.getter('name', () => {
            return 'nguyen';
        });

        const self = this.app;

        this.app.booted((app) => {
            app.setLocale('vi');
            return {};
        });

        Context.getter('lang', function() {
            const translator: any = self.use('translator');
            try {
                translator.setLocale(this.req.headers.locale);
            } catch (e) {
            }
            return translator;
        });
    }

    boot(): void {
    }
}
