/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { ShippingMethodModel } from '../Models/ShippingMethodModel';
import { ShippingMethodCreateArgsType } from '../Types/ShippingMethod/ShippingMethodCreateArgsType';

@Service()
export class ShippingMethodRepository extends BaseRepository<ShippingMethodModel, typeof ShippingMethodModel> {
    model(): typeof ShippingMethodModel {
        return ShippingMethodModel;
    }

    async create(data: ShippingMethodCreateArgsType): Promise<ShippingMethodModel> {
        return this.transaction(async () => {
            const method = await this.newQuery()
                                     .where('zoneId', data.zoneId)
                                     .orderBy('methodOrder', 'desc')
                                     .first();

            data.methodOrder = 1;

            if ( method ) {
                data.methodOrder = method.methodOrder + 1;
            }

            return super.create(data);
        })
    }
}