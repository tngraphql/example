/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {OrderStatusModel} from "../Models/OrderStatusModel";

@Service()
export class OrderStatusRepository extends BaseRepository<OrderStatusModel, typeof OrderStatusModel>  {
    model(): typeof OrderStatusModel {
        return OrderStatusModel;
    }
}