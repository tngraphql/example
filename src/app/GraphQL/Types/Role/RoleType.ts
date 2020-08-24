/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 7:31 AM
 */
import {Field, ObjectType, Root} from "@tngraphql/graphql";
import { DateTime } from 'luxon'
import {TimestampScalarType} from "../TimestampScalarType";
import {registerPaginateType} from "../PaginateType";
import RoleModel from "../../../Models/RoleModel";
import {PermissionType} from "../Permission/PermissionType";
import {ID} from "../UidScalerType";
import {ConfigOptions} from "../../../../lib/ConfigOptions";
import {GraphQLBoolean} from "graphql";

@ObjectType('Role')
export class RoleType {
    static model = RoleModel

    @Field(returns => ID)
    public id: number | string

    @Field()
    public name: string;

    @Field()
    public displayName: string;

    @Field()
    public description: string;

    @Field(returns => GraphQLBoolean)
    public async isDefault(@Root() parent): Promise<boolean> {
        return parent.name === await ConfigOptions.getOption('defaultRole');
    };

    @Field(returns => [PermissionType])
    public permissions: PermissionType[]

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(RoleType);