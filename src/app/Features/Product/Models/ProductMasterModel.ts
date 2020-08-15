/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:33 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasMany, hasOne, manyToMany, morphOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {converBoolean} from "../../../../lib/utils";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import FavoriteModel from "../../Favorite/FavoriteModel";
import {
    BelongsTo,
    HasMany,
    HasOne,
    ManyToMany,
    MorphOne
} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import MediaModel from "../../../Models/MediaModel";
import {ProductmetaModel} from "./ProductmetaModel";
import {InventoryModel} from "./InventoryModel";
import {ProductImageModel} from "./ProductImageModel";
import {ProductVendorModel} from "./ProductVendorModel";
import {ProductTypeModel} from "./ProductTypeModel";
import {ProductBranchToAttributeModel} from "./ProductBranchToAttributeModel";
import {ProductBranchModel} from "./ProductBranchModel";
import TagModel from "../../Tag/TagModel";
import {ProductTagModel} from "./ProductTagModel";
import {ProductCategoryModel} from "./ProductCategoryModel";
import {Str} from "../../../../lib/Str";

export class ProductMasterModel extends BaseModel {
    public static table = 'product_master';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public name: string;

    @column()
    public kind: string;

    @column()
    public avatar: string;

    @column({ consume: value => Str.toString(value) })
    public thumbnailId: string;

    @column()
    public imageType: string;

    @column({
        prepare: value => converBoolean(value),
        consume: value => Number(value) === 1
    })
    public isFeatured: boolean;

    public static scopeIsFeatured(query, boolean = true, operation = '=') {
        if (typeof boolean !== "boolean") {
            throw new Error('value for isFeatured be must boolean');
        }
        return query.where('isFeatured', operation, converBoolean(boolean, 1, 0));
    }

    @column()
    public views: number;

    @column()
    public commentStatus: string;

    @column()
    public commentCount: number;

    @column()
    public description: string;

    @column()
    public content: string;

    @column({ consume: value => Str.toString(value) })
    public productTypeId: string;

    @column({ consume: value => Str.toString(value) })
    public productVendorId: string;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes])
    }

    @manyToMany(() => ProductTypeModel, {
        pivotTable: ProductCategoryModel.getTable(),
        pivotForeignKey: 'product_master_id',
        pivotRelatedForeignKey: 'category_id'
    })
    public categories: ManyToMany<typeof ProductTypeModel>

    @manyToMany(() => TagModel, {
        pivotTable: ProductTagModel.getTable()
    })
    public tags: ManyToMany<typeof TagModel>

    @hasMany(() => ProductBranchModel)
    public branches: HasMany<typeof ProductBranchModel>

    @hasOne(() => ProductBranchModel, {
        onQuery(query) {
            query.groupBy(query.qualifyColumn('productMasterId'))
                .selectRaw('COUNT(*) as total')
        }
    })
    public branchCount: HasOne<typeof ProductBranchModel>

    @hasMany(() => ProductBranchToAttributeModel)
    public allAttribute: HasMany<typeof ProductBranchToAttributeModel>

    @hasOne(() => ProductTypeModel)
    public productType: HasOne<typeof ProductTypeModel>

    @belongsTo(() => ProductVendorModel, {
        foreignKey: 'productVendorId'
    })
    public vendor: BelongsTo<typeof ProductVendorModel>

    @hasMany(() => ProductImageModel)
    public images: HasMany<typeof ProductImageModel>

    @hasOne(() => InventoryModel)
    public inventory: HasOne<typeof InventoryModel>

    @hasMany(() => ProductmetaModel, {
        onQuery(query) {
            query.where('metaKey', 'REGEXP', '^_');
        }
    })
    public meta

    @hasMany(() => ProductmetaModel, {
        onQuery(query) {
            query.where('metaKey', 'NOT REGEXP', '^_');
        }
    })
    public metaCustom

    @belongsTo(() => MediaModel, {
        foreignKey: 'thumbnailId'
    })
    public thumbnail: BelongsTo<typeof MediaModel>

    @morphOne(() => FavoriteModel, {
        name: 'favoriteable',
        async onQuery(query) {
            if (query.auth && await query.auth.check()) {
                query.where(query.qualifyColumn('userId'), await query.auth.id());
            }
        }
    })
    public favorite: MorphOne<typeof FavoriteModel>
}