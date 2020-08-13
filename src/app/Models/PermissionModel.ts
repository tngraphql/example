import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import {Str} from "../../lib/Str";

export default class PermissionModel extends BaseModel {
    public static table = 'permissions'

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public name: string;

    @column()
    public displayName: string;

    @column()
    public description: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<PermissionModel, 'id' | 'createdAt' | 'updatedAt'>
}
