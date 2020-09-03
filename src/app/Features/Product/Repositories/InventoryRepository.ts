/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 8:31 PM
 */
import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { AttributeModel } from '../Models/AttributeModel';
import { InventoryModel } from '../Models/InventoryModel';


@Service()
export class InventoryRepository extends BaseRepository<AttributeModel, typeof InventoryModel> {
    public model(): typeof InventoryModel {
        return InventoryModel;
    }

    /**
     * Cập nhật số lượng tồn kho
     *
     * @param data
     * @param {Integer} quantity The number to increment by
     * @param id
     * @return {Promise<*>}
     */
    public async updateQuantity({ quantity }, id) {
        const res = await this.newQuery().where('productBranchId', id).increment('quantity', quantity);

        return this.newQuery().where('productBranchId', id).first();
    }
}