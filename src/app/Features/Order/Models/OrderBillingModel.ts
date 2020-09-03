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

export class OrderBillingModel extends BaseModel {
    static table = 'order_billing';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column({ consume: value => Str.toString(value) })
    public orderId: string;

    @column()
    public country: string;

    @column()
    public company: string;

    @column()
    public city: string;

    @column()
    public address: string;

    @column({ columnName: 'address_2' })
    public address2: string;

    @column()
    public phone: string;

    @column()
    public email: string;

    @column()
    public posCode: string;

    @column()
    public name: string;

    @column()
    public paymentMethod: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}