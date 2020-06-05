/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 7:31 AM
 */
import {Field, ObjectType} from "@tngraphql/graphql";
import { DateTime } from 'luxon'
import {TimestampScalarType} from "../TimestampScalarType";
import {registerPaginateType} from "../PaginateType";
import RoleModel from "../../../Models/RoleModel";
import {PermissionType} from "../Permission/PermissionType";

@ObjectType('Role')
export class RoleType {
    static model = RoleModel

    @Field()
    public id: number

    @Field()
    public name: string;

    @Field()
    public displayName: string;

    @Field()
    public description: string;

    @Field()
    public isDefault(): boolean {
        return true;
    };

    @Field(returns => [PermissionType])
    public permissions: PermissionType[]

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(RoleType);