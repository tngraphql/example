/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {OrderShippingModel} from "../Models/OrderShippingModel";

@Service()
export class OrderShippingRepository extends BaseRepository<OrderShippingModel, typeof OrderShippingModel>  {
    model(): typeof OrderShippingModel {
        return OrderShippingModel;
    }
}