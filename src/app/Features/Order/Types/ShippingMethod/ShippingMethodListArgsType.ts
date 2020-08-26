/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ShippingMethodFilterEnumType} from "./ShippingMethodFilterEnumType";
import {ShippingMethodSortInputType} from "./ShippingMethodSortInputType";

@ArgsType()
export class ShippingMethodListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ShippingMethodFilterEnumType))
    filter: FilterContract<typeof ShippingMethodFilterEnumType>

    @Field(returns => [ShippingMethodSortInputType],{description: 'order'})
    sortBy: ShippingMethodSortInputType

    where: any;

    order: any;
}