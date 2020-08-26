/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {OrderModel} from "../Models/OrderModel";
import {OrderCreateArgsType} from "../Types/Order/OrderCreateArgsType";
import {Cart} from "../Lib/Cart";
import _ = require('lodash');
import {OrderBillingRepository} from "./OrderBillingRepository";
import {ShippingMethodRepository} from "./ShippingMethodRepository";
import {OrderUpdateArgsType} from "../Types/Order/OrderUpdateArgsType";
import {OrderItemRepository} from "./OrderItemRepository";
import {OrderItemModel} from "../Models/OrderItemModel";

@Service()
export class OrderRepository extends BaseRepository<OrderModel, typeof OrderModel>  {
    @Inject(type => OrderBillingRepository)
    protected orderBilling: OrderBillingRepository;

    @Inject(type => ShippingMethodRepository)
    protected shippingMethod: ShippingMethodRepository

    @Inject(type => OrderItemRepository)
    protected orderItem: OrderItemRepository

    model(): typeof OrderModel {
        return OrderModel;
    }

    /**
     * Đặt hàng
     *
     * @param data
     */
    async order(data: OrderCreateArgsType): Promise<OrderModel> {
        data.code = 'D' + this.autoCode();

        return this.transaction(async () => {
            const instance = await super.create(data);

            const cart = new Cart(data.items);
            for( const i in _.omit(data, ['items']) ) {
                cart[i] = data[i];
            }
            if ( ! data.taxValue ) {
                cart.taxes = false;
            }

            const order = await super.create({
                ...cart,
                total: cart.getTotal(),
                totalOrigin: cart.getTotalOrigin()

            });

            data.billingAddress && await instance.related('billingAddress').create(_.omit(data.billingAddress, 'id'));
            data.shippingAddress && await instance.related('shippingAddress').create(_.omit(data.shippingAddress, 'id'));

            await instance.related('items').createMany(
                cart.items.map(item => {
                    return {
                        ...item,
                        type: 'product',
                        total: item.getTotal()
                    }
                })
            );

            if ( data.shipping && data.shipping.methodId ) {
                const shipping = await this.shippingMethod
                    .newQuery()
                    .where('id', data.shipping.methodId)
                    .where('methodType', data.shipping.methodType)
                    .isEnabled()
                    .first();

                await instance.related('shipping').create({
                    ...data.shipping,
                    price: shipping.cost,
                    type: 'shipping'
                });
            }

            return instance;
        })
    }

    async create(data: OrderCreateArgsType): Promise<OrderModel> {
        data.code = 'D' + this.autoCode();

        return this.transaction(async () => {
            const instance = await super.create(data);

            const cart = new Cart(data.items);
            for( const i in _.omit(data, ['items']) ) {
                cart[i] = data[i];
            }
            if ( ! data.taxValue ) {
                cart.taxes = false;
            }

            const order = await super.create({
                ...cart,
                total: cart.getTotal(),
                totalOrigin: cart.getTotalOrigin()

            });

            await instance.related('billingAddress').create(_.omit(data.billingAddress, 'id'));
            await instance.related('shippingAddress').create(_.omit(data.shippingAddress, 'id'));
            await instance.related('items').createMany(
                cart.items.map(item => {
                    return {
                        ...item,
                        type: 'product',
                        total: item.getTotal()
                    }
                })
            );

            if ( data.shipping && data.shipping.methodId ) {
                const shipping = await this.shippingMethod
                    .newQuery()
                    .where('id', data.shipping.methodId)
                    .where('methodType', data.shipping.methodType)
                    .isEnabled()
                    .first();

                await instance.related('shipping').create({
                    ...data.shipping,
                    price: shipping.cost,
                    type: 'shipping'
                });
            }

            return instance;
        })
    }

    async update(data: OrderUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<OrderModel> {
        return this.transaction(async () => {

            const cart = new Cart(data.items);
            for( const i in _.omit(data, ['items']) ) {
                cart[i] = data[i];
            }
            if ( ! data.taxValue ) {
                cart.taxes = false;
            }

            const instance = await super.update({
                ...cart,
                total: cart.getTotal(),
                totalOrigin: cart.getTotalOrigin()
            }, value, attribute);

            data.billingAddress && await instance.related('billingAddress').updateOrCreate({
                orderId: instance.id
            }, data.billingAddress)
            data.shippingAddress && await instance.related('shippingAddress').updateOrCreate({
                orderId: instance.id
            }, data.shippingAddress)

            await this.orderItem.sync(instance, cart.items);

            // Cập nhật vận chuyển.
            if ( data.shipping ) {
                await instance.related('shipping').updateOrCreate({
                    id: data.shipping.id
                }, {
                    ...data.shipping,
                    type: 'shipping'
                });
            } else {
                await this.orderItem.newQuery()
                    .where('type', 'shipping')
                    .where('orderId', instance.id)
                    .delete();
            }

            return instance;
        })
    }

    autoCode(length = 8) {
        length = length || 8;

        var template = '';

        for (var i = 0; i < length; i++) {
            template = template + '#';
        }
        length = null;
        return this.replaceSymbolWithNumber(template);
    }

    replaceSymbolWithNumber(string, symbol = undefined) {
        string = string || "";
        // default symbol is '#'
        if (symbol === undefined) {
            symbol = '#';
        }

        var str = '';
        for (var i = 0; i < string.length; i++) {
            if (string.charAt(i) == symbol) {
                str += this.randomNumber(9);
            } else {
                str += string.charAt(i);
            }
        }
        return str;
    }

    randomNumber(num) {
        return Math.floor(Math.random() * num);
    }
}