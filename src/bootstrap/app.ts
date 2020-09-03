/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 5:22 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Application } from '@tngraphql/illuminate';
import * as path from 'path';
import { Kernel as ConsoleKernel } from '../app/Console/Kernel';
import { Kernel as GraphQLKernel } from '../app/GraphQL/Kernel';
import { HandlerException } from '../app/Exceptions/HandlerException';

const app = new Application(path.join(__dirname, '../'));

app.singleton('Illuminate/Foundation/GraphQL/Kernel', GraphQLKernel);

app.singleton('Illuminate/Foundation/Console/Kernel', ConsoleKernel);

app.singleton('ExceptionHandler', HandlerException);

app.alias('Illuminate/Foundation/Console/Kernel', 'ace');

export = app;
