/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { OrderHistoryModel } from '../Models/OrderHistoryModel';

@Service()
export class OrderHistoryRepository extends BaseRepository<OrderHistoryModel, typeof OrderHistoryModel> {
    model(): typeof OrderHistoryModel {
        return OrderHistoryModel;
    }
}