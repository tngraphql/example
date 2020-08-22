import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {PostFilterEnumType} from "./PostFilterEnumType";
import {PostSortInputType} from "./PostSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class PostListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(PostFilterEnumType))
    filter: FilterContract<typeof PostFilterEnumType>

    @Field(returns => [PostSortInputType],{description: 'order'})
    sortBy: PostSortInputType

    where: any;

    order: any;
}