/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/25/2020
 * Time: 8:20 PM
 */

import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasMany} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {Str} from "../../../../lib/Str";
import {DateTime} from "luxon";
import {ShippingLocationModel} from "./ShippingLocationModel";
import {HasMany} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {ShippingMethodModel} from "./ShippingMethodModel";

export class ShippingZoneModel extends BaseModel {
    static table = 'shipping_zones';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public name: string

    @column()
    public zoneOrder: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => ShippingLocationModel)
    public location: HasMany<typeof ShippingLocationModel>;

    @hasMany(() => ShippingMethodModel)
    public methods: HasMany<typeof ShippingMethodModel>;
}