/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/15/2020
 * Time: 10:51 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ValidationError } from '@tngraphql/illuminate';

export class GraphQLExceptions {

    static handle(error) {
        if ( error.originalError instanceof ValidationError ) {
            error.validation = error.originalError.getValidatorMessages();
        }

        return Object.assign({code: error.originalError.code}, error);
    }
}
