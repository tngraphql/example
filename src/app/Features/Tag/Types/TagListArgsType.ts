import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {TagFilterEnumType} from "./TagFilterEnumType";
import {TagSortInputType} from "./TagSortInputType";
import {filterType} from "../../../GraphQL/Types/FilterType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class TagListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(TagFilterEnumType))
    filter: FilterContract<typeof TagFilterEnumType>

    @Field(returns => [TagSortInputType],{description: 'order'})
    sortBy: TagSortInputType

    where: any;

    order: any;
}