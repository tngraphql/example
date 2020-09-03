/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 9:32 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ConsoleKernel } from '@tngraphql/illuminate/dist/Foundation/Console';
import { Greet } from './Commands/Greet';
import { Service } from '@tngraphql/illuminate';
import { KeysCommand } from '@tngraphql/auth/dist/src/command/KeysCommand';
import { TestHttpMake } from './Commands/TestHttpMake';

@Service()
export class Kernel extends ConsoleKernel {
    public commands = [
        Greet,
        KeysCommand,
        TestHttpMake
    ];

    classmap = [
        'database/seeds'
    ];
}
