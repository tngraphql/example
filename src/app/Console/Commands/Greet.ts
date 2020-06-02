/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/14/2020
 * Time: 9:34 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BaseCommand, Inject } from '@tngraphql/illuminate';
import { flags, args } from '@tngraphql/console';

export class Greet extends BaseCommand {
    static commandName = 'greet';

    @Inject('db') private db: any

    @args.string()
    public name: string;

    @flags.string()
    public offClose: boolean;

    async handle(...args: any[]): Promise<void> {
        this.logger.info('migration:rollback');
        console.log(this.offClose);
        console.log(this.name);
        // @ts-ignore
        // await this.kernel.exec('migration:rollback', [
        //     '--batch 0'
        // ]);
        //
        // this.logger.info('migration:run');
        // // @ts-ignore
        // await this.kernel.exec('migration:run', []).then(() => {
        //
        // })
        //
        // await this.db.manager.closeAll(true);
        return undefined;
    }


}
