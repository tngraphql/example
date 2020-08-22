/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:49 PM
 */
import {Arg, Ctx, Directive, Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";

@ObjectType('NavigationType')
export class NavigationType {
    @Field(returns => ID)
    public id: string;

    @Field({description: 'Tên menu '})
    public name: string;

    @Field()
    public alias: string;

    @Field({description: 'Mô tả menu '})
    public description: string;
}