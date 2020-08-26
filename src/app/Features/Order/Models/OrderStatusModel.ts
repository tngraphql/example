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

export class OrderStatusModel extends BaseModel {
    static table = 'order_status';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public color: string;

    @column()
    public name: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}