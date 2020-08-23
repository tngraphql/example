import {Field, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../GraphQL/Types/TimestampScalarType";
import {DateTime} from "luxon";
import {registerPaginateType} from "../../../GraphQL/Types/PaginateType";
import LanguageModel from "../LanguageModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Tag')
export class LanguageType {
    static model = LanguageModel

    @Field(returns => ID)
    public id: string

    @Field()
    public name: string;

    @Field()
    public slug: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(LanguageType);