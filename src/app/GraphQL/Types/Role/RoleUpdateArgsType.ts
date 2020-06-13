import {ArgsType, Field} from "@tngraphql/graphql";
import {GraphQLString} from "graphql";
import {Rules} from "@tngraphql/illuminate";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class RoleUpdateArgsType {
    @Field()
    @Rules('required')
    public id: number

    @Field()
    @Rules([
        'filled',
        'max:255'
    ])
    public displayName: string

    @Field()
    @Rules([
        'filled',
        'max:255'
    ])
    public description: string

    @Field(returns => [GraphQLString])
    public permissions: string
}