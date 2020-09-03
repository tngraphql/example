/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 3:50 PM
 */
import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { AttributeGroupModel } from '../Models/AttributeGroupModel';
import { ModelAttributes } from '@tngraphql/lucid/build/src/Contracts/Model/LucidRow';

@Service()
export class AttributeGroupRepository extends BaseRepository<AttributeGroupModel> {
    public model(): typeof AttributeGroupModel {
        return AttributeGroupModel;
    }

    public async firstOrCreate(search: Partial<ModelAttributes<AttributeGroupModel>>, data: Partial<ModelAttributes<AttributeGroupModel>>) {
        return this.model().firstOrCreate(search, data);
    }
}
