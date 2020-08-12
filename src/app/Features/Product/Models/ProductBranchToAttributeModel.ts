/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:30 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";

export class ProductBranchToAttributeModel extends BaseModel {
    public static table = 'product_branch_to_attribute';

    @column({isPrimary: true, consume: value => String(value)})
    public id: string;

    @column({ consume: value => String(value) })
    public attributeGroupId: number | string;

    @column({ consume: value => String(value) })
    public attributeId: number | string;

    @column({ consume: value => String(value) })
    public productBranchId: number | string;

    @column({ consume: value => String(value) })
    public productMasterId: number | string;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;
}
