/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/24/2020
 * Time: 5:04 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('App/UserModel', (faker) => {
    return {
        name: faker.username()
    }
});
