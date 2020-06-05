/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:08 PM
 */

import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../SortEnumType";
import RoleModel from "../../../Models/RoleModel";
import RoleUserModel from "../../../Models/RoleUserModel";
import {UserModel} from "../../../UserModel";

@InputType('UserSort')
export class UserSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    phone: SortEnumType

    @Field(returns => SortEnumType)
    name: SortEnumType

    @Field(returns => SortEnumType)
    dob: SortEnumType

    @Field(returns => SortEnumType)
    email: SortEnumType

    @Field(returns => SortEnumType)
    gender: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    deletedAt: SortEnumType

    @Field(returns => SortEnumType)
    roleId: SortEnumType

    @Field(returns => SortEnumType)
    roleName: SortEnumType

    resolveRoleId() {
        return RoleModel.query()
            .select(`${RoleModel.getTable()}.id`)
            .innerJoin(RoleUserModel.getTable(), `${RoleUserModel.getTable()}.role_id`, '=', `${RoleModel.getTable()}.id`)
            .whereRaw(`${RoleUserModel.getTable()}.user_id = ${UserModel.getTable()}.id`)
            .toSQL().sql
    }

    resolveRoleName() {
        return RoleModel.query()
            .select(`${RoleModel.getTable()}.name`)
            .innerJoin(RoleUserModel.getTable(), `${RoleUserModel.getTable()}.role_id`, '=', `${RoleModel.getTable()}.id`)
            .whereRaw(`${RoleUserModel.getTable()}.user_id = ${UserModel.getTable()}.id`)
            .toSQL().sql
    }
}