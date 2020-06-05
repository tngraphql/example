/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:07 PM
 */

import {ArgsType, Field} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {filterType} from "../FilterType";
import {UserSortInputType} from "./UserSortInputType";
import {UserFilterEnumType} from "./UserFilterEnumType";

@ArgsType()
export class UserListArgsType {
    @Field()
    page: number;

    @Field()
    limit: number = 20;

    @Field(returns => filterType(UserFilterEnumType))
    filter: FilterContract<typeof UserFilterEnumType>

    @Field(returns => [UserSortInputType],{description: 'order'})
    sortBy: UserSortInputType

    where: any;

    order: any;
}