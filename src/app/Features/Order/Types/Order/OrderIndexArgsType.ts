/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */
import {ArgsType, Field} from "@tngraphql/graphql";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {OrderFilterEnumType} from "./OrderFilterEnumType";
import {OrderSortInputType} from "./OrderSortInputType";

@ArgsType()
export class OrderIndexArgsType {
    @Field(returns => filterType(OrderFilterEnumType))
    filter: FilterContract<typeof OrderFilterEnumType>

    @Field(returns => [OrderSortInputType], {description: 'order'})
    sortBy: OrderSortInputType

    where: any;

    order: any;
}