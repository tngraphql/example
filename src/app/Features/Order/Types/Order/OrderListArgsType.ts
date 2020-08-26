/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {OrderFilterEnumType} from "./OrderFilterEnumType";
import {OrderSortInputType} from "./OrderSortInputType";

@ArgsType()
export class OrderListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(OrderFilterEnumType))
    filter: FilterContract<typeof OrderFilterEnumType>

    @Field(returns => [OrderSortInputType],{description: 'order'})
    sortBy: OrderSortInputType

    where: any;

    order: any;
}