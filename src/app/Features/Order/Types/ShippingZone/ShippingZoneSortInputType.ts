import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../../GraphQL/Types/SortEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
@InputType('ShippingZoneSort')
export class ShippingZoneSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public name: SortEnumType

    @Field(returns => SortEnumType)
    public zoneOrder: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType
}
