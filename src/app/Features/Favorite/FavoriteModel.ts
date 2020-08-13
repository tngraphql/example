import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, belongsTo} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {UserModel} from "../../UserModel";
import {BelongsTo} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {Str} from "../../../lib/Str";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 8:14 AM
 */

export default class FavoriteModel extends BaseModel {
    public static table = 'favorites';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column({ consume: value => Str.toString(value) })
    public favoriteableId: string

    @column()
    public favoriteableType: string

    @column({ consume: value => Str.toString(value) })
    public userId: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => UserModel, {
        localKey: 'id',
        foreignKey: 'userId'
    })
    public user: BelongsTo<typeof UserModel>

    public static $columns: Pick<FavoriteModel, 'id' | 'favoriteableId' | 'favoriteableType' | 'userId' | 'createdAt' | 'updatedAt'>
}
