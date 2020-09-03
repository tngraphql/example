/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { OrderItemModel } from '../Models/OrderItemModel';
import { OrderModel } from '../Models/OrderModel';
import { CartItem } from '../Lib/CartItem';

@Service()
export class OrderItemRepository extends BaseRepository<OrderItemModel, typeof OrderItemModel> {
    model(): typeof OrderItemModel {
        return OrderItemModel;
    }

    async sync(order: OrderModel, data: CartItem[]) {
        const itemIds = [];

        for await ( let item of data ) {
            let orderItem;

            if ( ! item.id ) {
                orderItem = await order.related('items').create({
                    ...item.getData(),
                    type: 'product'
                });

            } else {
                orderItem = await order.related('items').updateOrCreate({
                    orderId: order.id,
                    type: 'product',
                    id: item.id
                }, {
                    ...item.getData(),
                    type: 'product'
                });
            }

            itemIds.push(orderItem.id);
        }
        ;

        console.log(itemIds);

        await this.newQuery()
                  .whereNotIn('id', itemIds)
                  .where('type', 'product')
                  .where('orderId', order.id)
                  .delete();
    }
}