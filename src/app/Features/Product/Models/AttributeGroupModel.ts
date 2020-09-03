/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:23 AM
 */
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { DateTime } from 'luxon';
import { SoftDeletes } from '@tngraphql/lucid/build/src/Orm/SoftDeletes';
import { Str } from '../../../../lib/Str';

export class AttributeGroupModel extends BaseModel {
    public static table = 'attribute_group';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column()
    public name: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes])
    }
}