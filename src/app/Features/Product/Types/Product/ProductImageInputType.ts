/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 7:50 PM
 */
import {Field, InputType} from "@tngraphql/graphql";
import {ID} from "../../../../GraphQL/Types/UidScalerType";

@InputType('ProductImageInput')
export class ProductImageInputType {
    @Field({description: 'Hình ảnh.'})
    public image: string

    @Field(returns => ID,{description: 'Id thumbnail'})
    public thumbnailId: string
}