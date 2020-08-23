/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:13 AM
 */
import {Field, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "./UidScalerType";
import {StatusScalarType} from "./StatusScalarType";

@ObjectType()
export class MessageType {

    @Field(returns => StatusScalarType)
    public status: string;

    @Field()
    public message: string;

    @Field(returns => [ID])
    public data: string;
}