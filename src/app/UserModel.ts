/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/13/2020
 * Time: 11:57 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {Auth} from "@tngraphql/auth/dist/src/Auth";
import {HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {ProfileModel} from "./ProfileModel";

// App/UserModel
export class UserModel extends Auth {
    public static table = 'users'

    @column({ isPrimary: true })
    public id: string;

    @column()
    public name: string;

    @column()
    public password: string;

    @hasOne(() => ProfileModel, {foreignKey: 'userId'})
    public profile: HasOne<typeof ProfileModel>

    static boot() {
        super.boot();
    }
}
