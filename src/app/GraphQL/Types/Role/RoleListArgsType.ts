import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../FilterType";
import {UserFilterEnumType} from "../User/UserFilterEnumType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {UserSortInputType} from "../User/UserSortInputType";
import {RoleFilterEnumType} from "./RoleFilterEnumType";
import {RoleSortInputType} from "./RoleSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class RoleListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(RoleFilterEnumType))
    filter: FilterContract<typeof RoleFilterEnumType>

    @Field(returns => [RoleSortInputType],{description: 'order'})
    sortBy: RoleSortInputType

    where: any;

    order: any;
}