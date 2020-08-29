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
import { ApolloServer } from 'apollo-server-express';
import { Kernel } from './app/GraphQL/Kernel';
const express = require('express');
const exp = express();

const app: Application = require('./bootstrap/app');

const log = console.log;
function trace() {
    try {
        throw new Error();
    } catch (e) {
        log.apply(log, [e.stack.split('\n')[2].trim(),'\n', ...arguments]);
    }
}

// console.log = trace;

async function main() {
    console.time();
    app.autoload(path.join(app.getBasePath(), 'app'), 'App');

    const kernel: Kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

    // BaseModel.$container = app;
    await kernel.handle();

    const configApp = app.config.get('app');

    // Tạo graphiql
    exp.get('/graphiql', (req, res) => {
        res.sendFile(process.cwd() + '/graphiql.html');
    });

    const server = new ApolloServer({
        schema: await kernel.complie(),
        formatError: app.use('ExceptionHandler').render,
        context: context => {
            return {
                app,
                ...context
            };
        },
        playground: configApp.playground,
        validationRules: kernel.validationRules(),
        introspection: configApp.introspection,
        plugins: kernel.plugins
    });

    server.applyMiddleware({ app: exp, path: process.env.GRAPHQL_PATH || '/graphql' });

    const {media} = require('./media');

    exp.use(media);

    await exp.listen(4002, '127.0.0.1');
    console.timeEnd();
}

main().then(() => {
    console.log(`start http://localhost:4002`);
}).catch(console.log);
