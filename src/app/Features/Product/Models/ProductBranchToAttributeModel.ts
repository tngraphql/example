/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:30 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {Str} from "../../../../lib/Str";
import {AttributeModel} from "./AttributeModel";
import {BelongsTo} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {AttributeGroupModel} from "./AttributeGroupModel";

export class ProductBranchToAttributeModel extends BaseModel {
    public static table = 'product_branch_to_attribute';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({ consume: value => Str.toString(value) })
    public attributeGroupId: number | string;

    @column({ consume: value => Str.toString(value) })
    public attributeId: number | string;

    @column({ consume: value => Str.toString(value) })
    public productBranchId: number | string;

    @column({ consume: value => Str.toString(value) })
    public productMasterId: number | string;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @belongsTo(() => AttributeModel)
    public attribute: BelongsTo<typeof AttributeModel>

    @belongsTo(() => AttributeGroupModel)
    public attributeGroup: BelongsTo<typeof AttributeGroupModel>
}
