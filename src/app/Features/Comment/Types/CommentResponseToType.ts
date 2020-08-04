/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/19/2020
 * Time: 9:21 PM
 */
import {Field, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {Str} from "../../../../lib/Str";

@ObjectType('CommentResponseTo')
export class CommentResponseToType {
    @Field(returns => ID)
    public id: string;

    @Field({description: 'Tên',})
    public name(@Root() parent): string {
        return parent.title || parent.name;
    };

    @Field()
    public slug(@Root() parent): string {
        return Str.slug(parent.slug || parent.title || parent.name, {lower: true});
    };
}