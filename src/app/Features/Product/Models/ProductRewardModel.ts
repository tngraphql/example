/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:37 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import {Str} from "../../../../lib/Str";

export class ProductRewardModel extends BaseModel {
    public static table = 'product_reward';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({ consume: value => Str.toString(value) })
    public productMasterId: string;

    @column({ consume: value => Str.toString(value) })
    public productBranchId: string;

    @column({ consume: value => Str.toString(value) })
    public customGroupId: string;

    @column()
    public points: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes])
    }
}
