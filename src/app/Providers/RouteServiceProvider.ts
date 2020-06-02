/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/16/2020
 * Time: 8:28 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { RoutingServiceProvider } from '@tngraphql/illuminate/dist/Foundation/Routing/RoutingServiceProvider';

export class RouteServiceProvider extends RoutingServiceProvider {

    /**
     * This namespace is applied to your resolver routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    _namespace: string = 'App/GraphQL/Resolvers';

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public map() {
        this.mapDefaultRouter();
        // this.mapMutationRouter();
    }

    protected mapDefaultRouter() {
        delete require.cache[require.resolve(this.app.basePath('start/route'))]
        this.app.route.group(() => require(this.app.basePath('start/route')))
             .namespace('App/GraphQL/Resolves')
             // .middleware(['acl:admin']);
    }
}
