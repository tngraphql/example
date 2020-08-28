/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */
import {ArgsType, Field} from "@tngraphql/graphql";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {TagFilterEnumType} from "./TagFilterEnumType";
import {TagSortInputType} from "./TagSortInputType";

@ArgsType()
export class TagIndexArgsType {
    @Field(returns => filterType(TagFilterEnumType))
    filter: FilterContract<typeof TagFilterEnumType>

    @Field(returns => [TagSortInputType], {description: 'order'})
    sortBy: TagSortInputType

    where: any;

    order: any;
}