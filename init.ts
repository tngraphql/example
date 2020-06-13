/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/2/2020
 * Time: 9:26 AM
 */
import * as chai from 'chai';
chai.use(require('chai-as-promised'));
import {join} from "path";
import {Kernel} from "./src/app/GraphQL/Kernel";
import {Application} from "@tngraphql/illuminate";
import { requireAll } from '@poppinss/utils/build'
import {resetTables} from "./tests/helpers";

chai.config.includeStack = true;
chai.should();

const log = console.log;
function trace() {
    try {
        throw new Error();
    } catch (e) {
        log.apply(log, [e.stack.split('\n')[2].trim(),'\n', ...arguments]);
    }
}

console.log = trace;
let app: Application;
before(async function() {
    app = require('./src/bootstrap/app');

    app.autoload(join(app.getBasePath(), 'app'), 'App');

    app.environment = 'test';

    const kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

    await kernel.handle();

    requireAll(app.basePath('database'), true);

    const {setupDB, resetTables} = require('./tests/helpers');
    await setupDB();
    await resetTables();
});

after(async () => {
    const {cleanup} = require('./tests/helpers');

    await cleanup();
});