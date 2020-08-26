/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
import {ArgsType, Field} from "@tngraphql/graphql";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {ShippingMethodFilterEnumType} from "./ShippingMethodFilterEnumType";
import {ShippingMethodSortInputType} from "./ShippingMethodSortInputType";

@ArgsType()
export class ShippingMethodIndexArgsType {
    @Field(returns => filterType(ShippingMethodFilterEnumType))
    filter: FilterContract<typeof ShippingMethodFilterEnumType>

    @Field(returns => [ShippingMethodSortInputType], {description: 'order'})
    sortBy: ShippingMethodSortInputType

    where: any;

    order: any;
}