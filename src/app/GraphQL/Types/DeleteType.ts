import {Field, Int, ObjectType} from "@tngraphql/graphql";
import {StatusScalarType} from "./StatusScalarType";
import {GraphQLString} from "graphql";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 8:10 PM
 */

@ObjectType('Delete', {description: 'Phân trang'})
export class DeleteType {
    @Field(returns => StatusScalarType)
    status: any

    message: string

    @Field(returns => [GraphQLString])
    data: string[]
}