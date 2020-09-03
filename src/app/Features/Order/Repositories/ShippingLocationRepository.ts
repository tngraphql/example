/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { ShippingLocationModel } from '../Models/ShippingLocationModel';

@Service()
export class ShippingLocationRepository extends BaseRepository<ShippingLocationModel, typeof ShippingLocationModel> {
    model(): typeof ShippingLocationModel {
        return ShippingLocationModel;
    }
}