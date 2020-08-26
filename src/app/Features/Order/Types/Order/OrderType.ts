/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Arg, Ctx, Directive, Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import {UserType} from "../../../../GraphQL/Types/User/UserType";
import {OrderModel} from "../../Models/OrderModel";
import {OrderItemType} from "./OrderItemType";
import {OrderStatusType} from "./OrderStatusType";
import {OrderBillingAddressType} from "./OrderBillingAddressType";
import {OrderShippingAddressType} from "./OrderShippingAddressType";
import {OrderShippingType} from "./OrderShippingType";

@ObjectType('Order')
export class OrderType {
    static model = OrderModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Mã đơn hàng'})
    public code: string

    @Field(returns => ID, {description: 'Trạng thái đơn hàng'})
    public orderStatusId: string

    @Field(returns => OrderStatusType, {description: 'Trạng thái đơn hàng'})
    public status: OrderStatusType

    @Field(returns => OrderBillingAddressType, {description: 'Thông tin người mua'})
    public billingAddress: OrderBillingAddressType

    @Field(returns => OrderShippingAddressType, {description: 'Địa chỉ nhận hàng'})
    public shippingAddress: OrderShippingAddressType

    @Field(returns => [OrderItemType], {description: 'Sản phẩm trong đơn hàng'})
    public items: OrderItemType[]

    @Field(returns => OrderShippingType,{description: 'Vận chuyển'})
    public shipping: OrderShippingType

    @Field({description: 'Tổng giá trị đơn hàng trước chiết khấu.'})
    public totalOrigin: number

    @Field({description: 'Tổng giá trị đơn hàng sau chiết khấu.'})
    public total: number

    @Field({description: 'Chiết khấu'})
    public discount: number

    @Field({description: 'Loại Chiết khấu'})
    public discountType: number

    @Field({description: 'Giá trị gia tăng'})
    public taxValue: number

    @Field(returns => ID, {description: 'ID khách hàng'})
    public customerId: string

    @Field(returns => UserType, {description: 'Khách hàng'})
    public customer: UserType

    @Field(returns => ID, {description: 'ID nhóm khách hàng'})
    public customerGroupId: string

    @Field({description: 'IP tạo đơn'})
    public ip: string

    @Field({description: 'IP tạo đơn'})
    public forwardedIp: string

    @Field({description: 'Trình duyệt tạo đơn'})
    public userAgent: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(OrderType);