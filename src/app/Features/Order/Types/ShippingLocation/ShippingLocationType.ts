/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:32 AM
 */
import { Field, ObjectType } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ShippingLocationModel } from '../../Models/ShippingLocationModel';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';

@ObjectType('ShippingLocation')
export class ShippingLocationType {
    static model = ShippingLocationModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID)
    public zoneId: string

    @Field()
    public code: string

    @Field()
    public type: string


    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(ShippingLocationType);