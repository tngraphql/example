/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:25 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";

export class InventoryModel extends BaseModel {
    public static table = 'inventories';

    @column({isPrimary: true, consume: value => String(value)})
    public id: string;
    @column({consume: value => String(value)})
    public productMasterId: string;
    @column({consume: value => String(value)})
    public productBranchId: string;

    @column()
    public quantity: number;

    @column()
    public inventoryPolicy: string;

    @column()
    public inventoryManagement: string;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;
}