import {Field, ObjectType} from "@tngraphql/graphql";
import {UserModel} from "../../../UserModel";
import {registerPaginateType} from "../PaginateType";
import {RoleType} from "../Role/RoleType";
import {DateTime} from "luxon";
import {TimestampScalarType} from "../TimestampScalarType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:06 PM
 */

@ObjectType('User')
export class UserType {
    static model = UserModel;

    @Field()
    id: number

    @Field()
    public phone: string;

    @Field()
    public name: string;

    @Field()
    public avatar: string;

    @Field()
    public dob: string;

    @Field()
    public email: string;

    @Field()
    public gender: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime;

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime;

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime;

    @Field(returns => [RoleType])
    roles: RoleType[]
}

registerPaginateType(UserType);