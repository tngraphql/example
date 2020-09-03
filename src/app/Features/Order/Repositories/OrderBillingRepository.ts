/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { OrderBillingModel } from '../Models/OrderBillingModel';

@Service()
export class OrderBillingRepository extends BaseRepository<OrderBillingModel, typeof OrderBillingModel> {
    model(): typeof OrderBillingModel {
        return OrderBillingModel;
    }
}