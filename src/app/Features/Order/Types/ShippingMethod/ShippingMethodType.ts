/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:32 AM
 */
import { Field, ObjectType } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ShippingMethodModel } from '../../Models/ShippingMethodModel';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';

@ObjectType('ShippingMethod')
export class ShippingMethodType {
    static model = ShippingMethodModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID)
    public zoneId: string

    @Field()
    public methodType: string

    @Field()
    public methodOrder: number

    @Field()
    public title: string

    @Field()
    public requires: string

    @Field()
    public value: string

    @Field()
    public taxStatus: string

    @Field()
    public cost: number

    @Field()
    public isEnabled: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(ShippingMethodType);