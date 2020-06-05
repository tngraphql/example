import {Field, ObjectType} from "@tngraphql/graphql";
import {UserModel} from "../../../UserModel";
import {registerPaginateType} from "../PaginateType";
import {RoleType} from "../Role/RoleType";

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
    public token: string;

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

    @Field()
    public createdAt: string;

    @Field()
    public updatedAt: string;

    @Field()
    public deletedAt: string;

    @Field(returns => [RoleType])
    roles: RoleType[]
}

registerPaginateType(UserType);