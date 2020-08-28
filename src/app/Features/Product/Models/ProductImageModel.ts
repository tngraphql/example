/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:32 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import MediaModel from "../../Media/MediaModel";
import {BelongsTo, HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {Str} from "../../../../lib/Str";

export class ProductImageModel extends BaseModel {
    public static table = 'product_image';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({ consume: value => Str.toString(value) })
    public productMasterId?: string;

    @column({ consume: value => Str.toString(value) })
    public productBranchId?: string;

    @column()
    public image?: string;

    @column({ consume: value => Str.toString(value) })
    public thumbnailId?: string;

    @column()
    public sortOrder?: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @belongsTo(() => MediaModel, {
        foreignKey: 'thumbnailId',
    })
    public thumbnail: BelongsTo<typeof MediaModel>
}