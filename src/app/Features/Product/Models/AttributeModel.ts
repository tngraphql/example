/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:24 AM
 */
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { DateTime } from 'luxon';
import { Str } from '../../../../lib/Str';

export class AttributeModel extends BaseModel {
    public static table = 'attributes';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column()
    public name: string;

    @column({ consume: value => Str.toString(value) })
    public attributeGroupId: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}