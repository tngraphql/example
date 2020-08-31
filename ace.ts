/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 9:13 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
require('reflect-metadata');
const path = require('path');

const app = require(path.join(process.cwd(), process.env.NODE_ENV !== 'production' ? 'src' : 'dist', 'bootstrap/app'));

async function main() {
    app.autoload(path.join(app.getBasePath(), 'app'), 'App');

    const kernel = await app.make('Illuminate/Foundation/Console/Kernel');

    await kernel.handle();

    process.exit();
}

main().catch(console.log);