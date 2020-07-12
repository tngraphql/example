import {Field, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {DateTime} from "luxon";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import ContactModel from "../../ContactModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Contact')
export class ContactType {
    static model = ContactModel

    @Field(returns => ID)
    public id: string

    @Field()
    public name: string;

    @Field()
    public email: string;

    @Field()
    public phone: string;

    @Field()
    public address: string;

    @Field()
    public content: string;

    @Field()
    public subject: string;

    @Field()
    public status: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ContactType);