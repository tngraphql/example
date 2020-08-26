import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
@InputType('ShippingMethodSort')
export class ShippingMethodSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public zoneId: SortEnumType

    @Field(returns => SortEnumType)
    public methodType: SortEnumType

    @Field(returns => SortEnumType)
    public methodOrder: SortEnumType

    @Field(returns => SortEnumType)
    public title: SortEnumType

    @Field(returns => SortEnumType)
    public requires: SortEnumType

    @Field(returns => SortEnumType)
    public value: SortEnumType

    @Field(returns => SortEnumType)
    public taxStatus: SortEnumType

    @Field(returns => SortEnumType)
    public cost: SortEnumType

    @Field(returns => SortEnumType)
    public isEnabled: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType
}
