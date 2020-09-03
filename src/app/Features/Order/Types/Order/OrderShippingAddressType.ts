/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:24 AM
 */
import { Arg, Ctx, Directive, Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { DateTime } from 'luxon';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { OrderShippingModel } from '../../Models/OrderShippingModel';

@ObjectType()
export class OrderShippingAddressType {
    static model = OrderShippingModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID, { description: 'ID đơn hàng' })
    public orderId: string

    @Field({ description: 'Quốc gia' })
    public country: string

    @Field({ description: 'Công ty' })
    public company: string

    @Field({ description: 'Thành phố' })
    public city: string

    @Field({ description: 'Địa chỉ' })
    public address: string

    @Field({ description: 'Địa chỉ' })
    public address2: string

    @Field({ description: 'Số điện thoại' })
    public phone: string

    @Field()
    public email: string

    @Field()
    public posCode: string

    @Field({ description: 'Họ tên' })
    public name: string

    @Field({ description: 'Ghi chú' })
    public note: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}