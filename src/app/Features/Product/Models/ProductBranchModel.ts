/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:27 AM
 */
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { belongsTo, column, hasMany, hasOne } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { DateTime } from 'luxon';
import { ProductMasterModel } from './ProductMasterModel';
import { BelongsTo, HasMany, HasOne } from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';
import { ProductBranchToAttributeModel } from './ProductBranchToAttributeModel';
import { ProductImageModel } from './ProductImageModel';
import { InventoryModel } from './InventoryModel';
import { converBoolean } from '../../../../lib/utils';
import { Str } from '../../../../lib/Str';
import { SoftDeletes } from '@tngraphql/lucid/build/src/Orm/SoftDeletes';

export class ProductBranchModel extends BaseModel {
    public static table = 'product_branch';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column()
    public sku: string;

    @column()
    public code: string;

    @column({
        prepare: value => converBoolean(value, 2, 1),
        consume: value => Number(value) === 2
    })
    public isMaster: boolean;

    public static scopeIsMaster(query, boolean: boolean = true, operation = '=') {
        if ( typeof boolean !== 'boolean' ) {
            throw new Error('value for isFeatured be must boolean');
        }

        return query.where('isMaster', operation, converBoolean(boolean, 2, 1));
    }

    @column()
    public fullname: string;

    @column()
    public unitValue: number;

    @column()
    public unitName: string;

    @column({ consume: value => Str.toString(value) })
    public productMasterId: string;

    @column({ consume: value => Str.toString(value) })
    public productTypeId: string;

    @column({ consume: value => Str.toString(value) })
    public productVendorId: string;

    @column()
    public price: number;

    @column()
    public priceSale: number;

    @column({
        prepare: value => converBoolean(value, 2, 1),
        consume: value => Number(value) === 2
    })
    public requiresShipping: boolean;

    public static scopeRequiresShipping(query, boolean: boolean = true, operation = '=') {
        if ( typeof boolean !== 'boolean' ) {
            throw new Error('value for isFeatured be must boolean');
        }

        return query.where('requiresShipping', operation, converBoolean(boolean, 2, 1));
    }

    @column()
    public hsCode: string;

    @column()
    public weight: number;

    @column()
    public weightClass: string;

    @column()
    public type: string;

    @column()
    public length: number;

    @column()
    public width: number;

    @column()
    public height: number;

    @column()
    public lengthClass: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes])
    }

    @belongsTo(() => ProductMasterModel)
    public master: BelongsTo<typeof ProductMasterModel>

    @hasMany(() => ProductBranchModel, { foreignKey: 'productMasterId', localKey: 'productMasterId' })
    public branches: HasMany<typeof ProductBranchModel>

    @hasOne(() => ProductBranchModel, {
        foreignKey: 'productMasterId',
        localKey: 'productMasterId',
        onQuery(query) {
            query.groupBy('productMasterId')
            query.selectRaw('COUNT(*) as total');
        }
    })
    public branchCount: any;

    @hasMany(() => ProductBranchToAttributeModel, {
        foreignKey: 'productBranchId'
    })
    public attributes: HasMany<typeof ProductBranchToAttributeModel>

    @hasMany(() => ProductBranchToAttributeModel, {
        foreignKey: 'productBranchId',
        localKey: 'productBranchId'
    })
    public allAttribute: HasMany<typeof ProductBranchToAttributeModel>

    @hasMany(() => ProductImageModel, {
        foreignKey: 'productBranchId',
    })
    public images: HasMany<typeof ProductImageModel>

    @hasOne(() => InventoryModel, {
        foreignKey: 'productBranchId',
    })
    public inventory: HasOne<typeof InventoryModel>;
}