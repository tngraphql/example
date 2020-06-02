import {Field, ObjectType} from "@tngraphql/graphql";
import {UserModel} from "../../../UserModel";
import {registerPaginateType} from "../PaginateType";

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
    name: string

    // @Field()
    // profile: ProfileType
}

registerPaginateType(UserType);