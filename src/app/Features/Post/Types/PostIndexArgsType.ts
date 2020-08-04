import {ArgsType, Field} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {PostFilterEnumType} from "./PostFilterEnumType";
import {PostSortInputType} from "./PostSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class PostIndexArgsType {
    @Field(returns => filterType(PostFilterEnumType))
    filter: FilterContract<typeof PostFilterEnumType>

    @Field(returns => [PostSortInputType], {description: 'order'})
    sortBy: PostSortInputType

    where: any;

    order: any;
}