/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:24 AM
 */

import { Arg, Ctx, Directive, Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { OrderStatusModel } from '../../Models/OrderStatusModel';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { DateTime } from 'luxon';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';

@ObjectType()
export class OrderStatusType {
    static model = OrderStatusModel

    @Field(returns => ID)
    public id: string

    @Field({ description: 'Màu sắc' })
    public color: string

    @Field({ description: 'Tên trạng thái' })
    public name: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(OrderStatusType);