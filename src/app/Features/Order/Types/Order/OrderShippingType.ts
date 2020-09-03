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
export class OrderShippingType {
    static model = OrderShippingModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID, {})
    public orderId: string

    @Field({ description: 'Tên' })
    public name: string

    @Field({ description: 'Giá trị' })
    public price: number

    @Field(returns => Int)
    public methodId: number

    @Field()
    public methodType: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}