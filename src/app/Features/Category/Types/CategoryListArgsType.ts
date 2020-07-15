import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {CategoryFilterEnumType} from "./CategoryFilterEnumType";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {CategorySortInputType} from "./CategorySortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class CategoryListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(CategoryFilterEnumType))
    filter: FilterContract<typeof CategoryFilterEnumType>

    @Field(returns => [CategorySortInputType],{description: 'order'})
    sortBy: CategorySortInputType

    where: any;

    order: any;
}