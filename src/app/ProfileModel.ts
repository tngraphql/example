import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/28/2020
 * Time: 9:08 PM
 */

export class ProfileModel extends BaseModel {
    public static table = 'profiles'

    @column({ isPrimary: true })
    public id: string;

    @column()
    public userId: number

    @column()
    public name: string
}