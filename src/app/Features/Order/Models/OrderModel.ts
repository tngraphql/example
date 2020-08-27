/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/25/2020
 * Time: 8:20 PM
 */

import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasMany, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {Str} from "../../../../lib/Str";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import {OrderStatusModel} from "./OrderStatusModel";
import {BelongsTo, HasMany, HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {OrderBillingModel} from "./OrderBillingModel";
import {OrderShippingModel} from "./OrderShippingModel";
import {UserModel} from "../../../UserModel";
import {OrderItemModel} from "./OrderItemModel";

export class OrderModel extends BaseModel {
    static table = 'orders';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public code: string

    @column({consume: value => Str.toString(value)})
    public orderStatusId: string

    @column()
    public totalOrigin: number

    @column()
    public total: number

    @column()
    public taxValue: number

    @column()
    public discount: number

    @column()
    public discountType: number

    @column({consume: value => Str.toString(value)})
    public customerId: string

    @column({consume: value => Str.toString(value)})
    public customerGroupId: string

    @column()
    public ip: string

    @column()
    public forwardedIp: string

    @column()
    public userAgent: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime;

    public static $columns: Pick<OrderModel, 'id' | 'code' | 'orderStatusId' | 'totalOrigin' | 'total' | 'taxValue'
        | 'discount' | 'discountType' | 'customerId' | 'customerGroupId' | 'ip' | 'forwardedIp'
        | 'userAgent' | 'createdAt' | 'updatedAt' | 'deletedAt'>

    public static boot() {
        this.uses([SoftDeletes]);
    }

    @belongsTo(() => OrderStatusModel)
    public status: BelongsTo<typeof OrderStatusModel>

    @hasOne(() => OrderBillingModel)
    public billingAddress: HasOne<typeof OrderBillingModel>

    @hasOne(() => OrderShippingModel)
    public shippingAddress: HasOne<typeof OrderShippingModel>

    @belongsTo(() => UserModel, {
        foreignKey: 'customerId'
    })
    public customer: BelongsTo<typeof UserModel>

    @hasMany(() => OrderItemModel, {
        onQuery(query) {
            query.where('type', 'product')
        }
    })
    public items: HasMany<typeof OrderItemModel>

    @hasOne(() => OrderItemModel, {
        onQuery(query) {
            query.where('type', 'shipping')
        }
    })
    public shipping: HasOne<typeof OrderItemModel>;
}