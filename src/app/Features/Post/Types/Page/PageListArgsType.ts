import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {PageFilterEnumType} from "./PageFilterEnumType";
import {PageSortInputType} from "./PageSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class PageListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(PageFilterEnumType))
    filter: FilterContract<typeof PageFilterEnumType>

    @Field(returns => [PageSortInputType],{description: 'order'})
    sortBy: PageSortInputType

    where: any;

    order: any;
}