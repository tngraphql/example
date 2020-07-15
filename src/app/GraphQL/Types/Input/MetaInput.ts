/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 5:05 PM
 */
import {Field, InputType} from "@tngraphql/graphql";
import {Any} from "../ScalarType/AnyScalerType";

@InputType()
export class MetaInput {
    @Field({description: 'key'})
    public metaKey: string;

    @Field(returns => Any, {description: 'Giá trị'})
    public metaValue: string;
}