/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {OrderItemModel} from "../Models/OrderItemModel";
import {OrderModel} from "../Models/OrderModel";

@Service()
export class OrderItemRepository extends BaseRepository<OrderItemModel, typeof OrderItemModel>  {
    model(): typeof OrderItemModel {
        return OrderItemModel;
    }

    async sync(order: OrderModel, data) {
        const itemIds = [];

        for (let item of data) {
            itemIds.push(item.id);

            await order.related('items').updateOrCreate({
                orderId: order.id
            }, {
                ...item,
                total: item.getTotal(),
                type: 'product'
            });
        };

        await this.newQuery()
            .whereNotIn('id', itemIds)
            .where('type', 'product')
            .where('orderId', order.id)
            .delete();
    }
}