/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 7:49 PM
 */
import {Field, InputType} from "@tngraphql/graphql";

@InputType('ProductAttributeInput')
export class ProductAttributeInputType {
    @Field({description: 'Tên nhóm thuộc tính'})
    public groupName: string;

    @Field({description: 'tên thuộc tính'})
    public name: string
}