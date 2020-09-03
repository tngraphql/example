/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/12/2020
 * Time: 9:10 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ResolverData } from '@tngraphql/graphql';

export class Acl {
    public app;

    public async handle(
        data: ResolverData,
        next: () => Promise<void>,
        allowedRoles: string[],
    ) {
        data.info.parentType.name
        console.log(`enforces "${ allowedRoles }" roles`)
        await next()
    }
}
