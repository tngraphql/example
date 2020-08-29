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
import { Kernel } from './app/GraphQL/Kernel';
const express = require('express')();
import {ApolloServer} from "apollo-server-express";

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

    await kernel.handle();

    // Tạo graphiql
    express.get('/graphiql', (req, res) => {
        res.sendFile(process.cwd() + '/graphiql.html');
    });

    const config = app.config.get('graphql');

    const server = new ApolloServer({
        schema: await kernel.complie(),
        ...config
    })

    server.applyMiddleware({ app: express, path: process.env.GRAPHQL_PATH || '/graphql' });

    const {media} = require('./media');

    express.use(media);

    await express.listen(4002, '127.0.0.1');
    console.timeEnd();
}

main().then(() => {
    console.log(`start http://localhost:4002/graphql`);
}).catch(console.log);
