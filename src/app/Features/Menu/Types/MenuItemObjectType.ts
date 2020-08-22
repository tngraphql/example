/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Field, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {Str} from "../../../../lib/Str";

@ObjectType('MenuItemObject')
export class MenuItemObjectType {
    @Field(returns => ID)
    public id: string;

    @Field({description: 'Tên'})
    public name: string;

    @Field()
    public slug(@Root() parent): string {
        return Str.slug(parent.slug || parent.title || parent.name);
    }
}