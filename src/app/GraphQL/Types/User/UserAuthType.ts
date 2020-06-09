import {UserType} from "./UserType";
import {Field, ObjectType} from "@tngraphql/graphql";

@ObjectType('UserAuth')
export class UserAuthType extends UserType {

    @Field()
    public token?: string;
}