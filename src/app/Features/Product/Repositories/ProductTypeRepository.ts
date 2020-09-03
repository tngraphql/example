/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 4:00 PM
 */

import { Inject, Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { ProductTypeModel } from '../Models/ProductTypeModel';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { ModelAttributes } from '@tngraphql/lucid/build/src/Contracts/Model/LucidRow';
import { ProductTypeMetaRepository } from './ProductTypeMetaRepository';
import { ProductTypeCreateArgsType } from '../Types/ProductType/ProductTypeCreateArgsType';
import { ProductTypeUpdateArgsType } from '../Types/ProductType/ProductTypeUpdateArgsType';

@Service()
export class ProductTypeRepository extends BaseRepository<ProductTypeModel> {
    @Inject(type => ProductTypeMetaRepository)
    protected meta: ProductTypeMetaRepository

    public model(): LucidModel {
        return ProductTypeModel;
    }

    public async create(data: ProductTypeCreateArgsType): Promise<ProductTypeModel> {
        return this.transaction(async () => {
            const instance = await super.create(data);

            if ( data.meta ) {
                await this.meta.sync(data.meta, instance);
            }

            return instance;
        })
    }

    public async update(data: ProductTypeUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<ProductTypeModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            if ( data.meta ) {
                await this.meta.sync(data.meta, instance);
            }

            return instance;
        });
    }

    public async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        const categoryId = typeof id === 'string' ? id : id.id;
        let category = typeof id === 'string' ? null : id;

        if ( categoryId === '1' ) {
            throw new Error('Bạn không thể xóa danh mục này.');
        }

        return this.transaction(async () => {
            if ( ! category ) {
                category = await super.newQuery().findBy(attribute, id);
            }

            await super.newQuery()
                       .where('parentId', category.id)
                       .update({ parentId: category.parentId });

            return super.delete(id, attribute);
        });
    }
}