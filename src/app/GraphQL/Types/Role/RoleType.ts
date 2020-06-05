/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 7:31 AM
 */
import {Field, ObjectType} from "@tngraphql/graphql";
import { DateTime } from 'luxon'
import {TimestampScalarType} from "../TimestampScalarType";

@ObjectType('Role')
export class RoleType {

    @Field()
    public id: number

    @Field()
    public name: string;

    @Field()
    public displayName: string;

    @Field()
    public description: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}