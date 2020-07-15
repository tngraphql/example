import {ArgsType, Field} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {CategoryFilterEnumType} from "./CategoryFilterEnumType";
import {CategorySortInputType} from "./CategorySortInputType";
import {filterType} from "../../../GraphQL/Types/FilterType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class CategoryIndexArgsType {
    @Field(returns => filterType(CategoryFilterEnumType))
    filter: FilterContract<typeof CategoryFilterEnumType>

    @Field(returns => [CategorySortInputType], {description: 'order'})
    sortBy: CategorySortInputType

    where: any;

    order: any;
}