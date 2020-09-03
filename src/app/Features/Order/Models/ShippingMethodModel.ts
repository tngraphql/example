/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/25/2020
 * Time: 8:20 PM
 */

import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { Str } from '../../../../lib/Str';
import { DateTime } from 'luxon';
import { converBoolean } from '../../../../lib/utils';

export class ShippingMethodModel extends BaseModel {
    static table = 'shipping_methods';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column({ consume: value => Str.toString(value) })
    public zoneId: string

    @column()
    public methodType: string

    @column()
    public methodOrder: number

    @column()
    public title: string

    @column()
    public requires: string

    @column()
    public value: string

    @column()
    public taxStatus: string

    @column()
    public cost: number

    @column()
    public isEnabled: boolean

    public static scopeIsEnabled(query, boolean = true, operation = '=') {
        if ( typeof boolean !== 'boolean' ) {
            throw new Error('value for isFeatured be must boolean');
        }
        return query.where('isFeatured', operation, converBoolean(boolean, 1, 0));
    }

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    public static $columns: Pick<ShippingMethodModel, 'id' | 'zoneId' | 'methodType' | 'methodOrder' | 'title'
        | 'requires' | 'value' | 'taxStatus' | 'cost' | 'isEnabled' | 'createdAt' | 'updatedAt'>
}