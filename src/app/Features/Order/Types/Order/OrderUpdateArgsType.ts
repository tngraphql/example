/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {OrderStatusModel} from "../../Models/OrderStatusModel";
import {UserModel} from "../../../../UserModel";
import {OrderModel} from "../../Models/OrderModel";
import {OrderItemInput} from "./Input/OrderItemInput";
import {OrderShippingInput} from "./Input/OrderShippingInput";
import {OrderBillingAddressInput} from "./Input/OrderBillingAddressInput";
import {OrderShippingAddressInput} from "./Input/OrderShippingAddressInput";


@ArgsType()
export class OrderUpdateArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(OrderModel.getTable(), 'id')
    ])
    public id: string;

    @Field(returns => ID, {description: 'Trạng thái'})
    @Rules([
        'filled',
        Rule.exists(OrderStatusModel, 'id')
    ])
    public orderStatusId: string;

    @Field({description: 'Thuế giá trị gia tăng'})
    public taxValue: number

    @Field({description: 'Giá trị chiết khấu',})
    public discount: number

    @Field({description: 'Loại chiết khấu',})
    public discountType: number

    @Field(returns => ID, {description: 'Khách hàng',})
    @Rules([
        Rule.exists(UserModel, 'id')
    ])
    public customerId: string

    @Field({description: 'Nhóm khách hàng',})
    @Rules([
        // Rule.exists(CustomGroupModel, 'id')
    ])
    public customerGroupId: string

    @Field(returns => [OrderItemInput], {description: 'Sản phẩm',})
    public items: OrderItemInput[]

    @Field(returns => OrderShippingInput, {description: 'Fee vận chuyển',})
    public shipping: OrderShippingInput

    @Field(returns => OrderBillingAddressInput, {description: 'Thông tin người mua',})
    public billingAddress: OrderBillingAddressInput

    @Field(returns => OrderShippingAddressInput, {description: 'Thông tin giao hàng',})
    public shippingAddress: OrderShippingAddressInput
}