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

export class OrderHistoryModel extends BaseModel {
    static table = 'order_histories';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({consume: value => Str.toString(value)})
    public orderId: string

    @column({consume: value => Str.toString(value)})
    public orderStatusId: string

    @column()
    public notify: string

    @column()
    public comment: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;
}