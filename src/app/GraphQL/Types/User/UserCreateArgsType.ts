import {ArgsType, Field} from "@tngraphql/graphql";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:06 PM
 */

@ArgsType()
export class UserCreateArgsType {

    @Field({description: 'ID'})
    id: string
}