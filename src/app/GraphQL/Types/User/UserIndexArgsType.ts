/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:52 PM
 */

import {ArgsType, Field} from "@tngraphql/graphql";
import {UserFilterEnumType} from "./UserFilterEnumType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {filterType} from "../FilterType";
import {UserSortInputType} from "./UserSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 8:55 AM
 */

@ArgsType()
export class UserIndexArgsType {
    @Field(returns => filterType(UserFilterEnumType))
    filter: FilterContract<typeof UserFilterEnumType>

    @Field(returns => [UserSortInputType], {description: 'order'})
    sortBy: UserSortInputType

    where: any;
}