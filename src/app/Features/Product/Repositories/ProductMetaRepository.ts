/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 8:18 PM
 */
import { Service } from '@tngraphql/illuminate';
import { MetableRepository } from '../../../../Repositories/Lucid/MetableRepository';
import { ProductmetaModel } from '../Models/ProductmetaModel';

@Service()
export class ProductMetaRepository extends MetableRepository {
    protected instanceKey = 'productMasterId';

    public model(): typeof ProductmetaModel {
        return ProductmetaModel;
    }

    public async sync(meta: any[], instance: { id: string }): Promise<void> {
        return this.upsert(meta, instance);
    }
}