/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/25/2020
 * Time: 8:20 PM
 */

import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {Str} from "../../../../lib/Str";
import {DateTime} from "luxon";

export class OrderItemShippingModel extends BaseModel {
    static table = 'order_items';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({consume: value => Str.toString(value)})
    public orderId: string

    @column({consume: value => Str.toString(value)})
    public productBranchId: string

    @column()
    public sku: string

    @column()
    public code: string

    @column()
    public name: string

    @column()
    public image: string

    @column()
    public price: number

    @column()
    public quantity: number

    @column()
    public total: number

    @column()
    public discount: number

    @column()
    public discountType: string

    @column()
    public tax: number

    @column()
    public reward: string

    @column()
    public type: string

    @column()
    public items: string

    @column({consume: value => Str.toString(value)})
    public methodId: string

    @column()
    public methodType: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}