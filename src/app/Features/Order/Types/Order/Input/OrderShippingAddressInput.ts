/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:10 AM
 */
import {Field, InputType} from "@tngraphql/graphql";
import {ID} from "../../../../../GraphQL/Types/UidScalerType";

@InputType()
export class OrderShippingAddressInput {
    @Field(returns => ID, {description: 'ID menu item',})
    public id: string

    @Field(returns => ID, {description: 'ID đơn hàng'})
    public orderId: string

    @Field({description: 'Quốc gia'})
    public country: string

    @Field({description: 'Công ty'})
    public company: string

    @Field({description: 'Thành phố'})
    public city: string

    @Field({description: 'Địa chỉ'})
    public address: string

    @Field({description: 'Địa chỉ'})
    public address2: string

    @Field({description: 'Số điện thoại'})
    public phone: string

    @Field()
    public email: string

    @Field()
    public posCode: string

    @Field({description: 'Họ tên'})
    public name: string

    @Field({description: 'Ghi chú'})
    public note: string
}