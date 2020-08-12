/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:32 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import MediaModel from "../../../Models/MediaModel";
import {HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";

export class ProductImageModel extends BaseModel {
    public static table = 'product_image';

    @column({isPrimary: true, consume: value => String(value)})
    public id: string;

    @column({ consume: value => String(value) })
    public productMasterId?: string;

    @column({ consume: value => String(value) })
    public productBranchId?: string;

    @column()
    public image?: string;

    @column({ consume: value => String(value) })
    public thumbnailId?: string;

    @column()
    public sortOrder?: number;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @hasOne(() => MediaModel, {
        foreignKey: 'thumbnailId',
    })
    public thumbnail: HasOne<typeof MediaModel>
}