import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../../GraphQL/Types/SortEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('OrderSort')
export class OrderSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public code: SortEnumType

    @Field(returns => SortEnumType)
    public orderStatusId: SortEnumType

    @Field(returns => SortEnumType)
    public totalOrigin: SortEnumType

    @Field(returns => SortEnumType)
    public total: SortEnumType

    @Field(returns => SortEnumType)
    public discount: SortEnumType

    @Field(returns => SortEnumType)
    public customerId: SortEnumType

    @Field(returns => SortEnumType)
    public customerGroupId: SortEnumType

    @Field(returns => SortEnumType)
    public ip: SortEnumType

    @Field(returns => SortEnumType)
    public forwardedIp: SortEnumType

    @Field(returns => SortEnumType)
    public userAgent: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType
}
