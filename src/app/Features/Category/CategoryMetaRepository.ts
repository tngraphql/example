/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/14/2020
 * Time: 9:57 AM
 */
import { MetableRepository } from '../../../Repositories/Lucid/MetableRepository';
import { Service } from '@tngraphql/illuminate';
import CategorymetaModel from './CategorymetaModel';

@Service()
export class CategoryMetaRepository extends MetableRepository {
    public model(): typeof CategorymetaModel {
        return CategorymetaModel;
    }

    public async sync(meta: any[], instance: { id: string }): Promise<void> {
        return this.upsert(meta, instance);
    }
}