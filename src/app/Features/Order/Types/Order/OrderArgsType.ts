/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { OrderStatusModel } from '../../Models/OrderStatusModel';
import { UserModel } from '../../../../UserModel';
import { OrderItemInput } from './Input/OrderItemInput';
import { OrderShippingInput } from './Input/OrderShippingInput';
import { OrderBillingAddressInput } from './Input/OrderBillingAddressInput';
import { OrderShippingAddressInput } from './Input/OrderShippingAddressInput';

@ArgsType()
export class OrderArgsType {
    public orderStatusId: string

    @Field(returns => ID, { description: 'Khách hàng', })
    @Rules([
        Rule.exists(UserModel.getTable(), 'id')
    ])
    public customerId: string

    public taxValue: number
    public discount: number
    public discountType: number

    @Field(returns => ID, { description: 'Nhóm khách hàng', })
    @Rules([
        // Rule.exists(CustomGroupModel, 'id')
    ])
    public customerGroupId: string

    @Field(returns => [OrderItemInput], { description: 'Sản phẩm', })
    public items: OrderItemInput[]

    @Field(returns => OrderShippingInput, { description: 'Fee vận chuyển', })
    public shipping: OrderShippingInput

    @Field(returns => OrderBillingAddressInput, { description: 'Thông tin người mua', })
    public billingAddress: OrderBillingAddressInput

    @Field(returns => OrderShippingAddressInput, { description: 'Thông tin giao hàng', })
    public shippingAddress: OrderShippingAddressInput

    public code: string;
    public ip: string;
    public forwardedIp: string;
    public userAgent: string;
}