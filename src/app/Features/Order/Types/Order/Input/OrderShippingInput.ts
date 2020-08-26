/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:10 AM
 */
import {Field, InputType, Int} from "@tngraphql/graphql";
import {ID} from "../../../../../GraphQL/Types/UidScalerType";

@InputType()
export class OrderShippingInput {
    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên'})
    public name: string

    @Field({description: 'Giá trị'})
    public price: number

    @Field(returns => Int)
    public methodId: number

    @Field()
    public methodType: string
}