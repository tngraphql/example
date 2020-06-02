/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 9:13 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import 'reflect-metadata'
import * as path from 'path';
const app: any = require('./src/bootstrap/app');

async function main() {
    app.autoload(path.join(app.getBasePath(), 'app'), 'App');

    // const tokens = Reflect.getMetadata('design:paramtypes', ConsoleKernel) || [];

    const kernel = await app.make('Illuminate/Foundation/Console/Kernel');
    // const kernel = await app.make<any>('Illuminate/Foundation/GraphQL/Kernel');
    // const kernel = await app.make<ConsoleKernel>(ConsoleKernel)
    await kernel.handle();

    process.exit();
}

main().catch(console.log);