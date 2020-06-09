/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/11/2020
 * Time: 12:30 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import 'reflect-metadata';
import { Application } from '@tngraphql/illuminate';
import * as path from 'path';
import { ApolloServer } from 'apollo-server';
import { Kernel } from './app/GraphQL/Kernel';
import { GraphQLExceptions } from './app/Exceptions/GraphQLExceptions';

const app: Application = require('./bootstrap/app');

async function main() {
    console.time();
    app.autoload(path.join(app.getBasePath(), 'app'), 'App');

    const kernel: Kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

    // BaseModel.$container = app;
    await kernel.handle();

    const server = new ApolloServer({
        schema: await kernel.complie(),
        formatError: GraphQLExceptions.handle.bind(app),
        context: context => context,
        playground: {
            // version: '1.7.10'
        }
    });


    await server.listen(4002);
    console.timeEnd();
}

main().then(() => {
    console.log(`start http://localhost:4002`);
}).catch(console.log);
