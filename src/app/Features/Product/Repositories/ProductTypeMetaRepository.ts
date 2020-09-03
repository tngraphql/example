/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 4:02 PM
 */

import { Service } from '@tngraphql/illuminate';
import { ProductTypeMetaModel } from '../Models/ProductTypeMetaModel';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { MetableRepository } from '../../../../Repositories/Lucid/MetableRepository';

@Service()
export class ProductTypeMetaRepository extends MetableRepository<ProductTypeMetaModel> {
    protected instanceKey = 'productTypeId';

    public model(): LucidModel {
        return ProductTypeMetaModel;
    }

    public async sync(meta: any[], instance: { id: string }): Promise<void> {
        return this.upsert(meta, instance);
    }
}