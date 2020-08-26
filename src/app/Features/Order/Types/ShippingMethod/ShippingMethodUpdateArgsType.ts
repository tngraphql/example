/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {ShippingMethodModel} from "../../Models/ShippingMethodModel";

@ArgsType()
export class ShippingMethodUpdateArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(ShippingMethodModel.getTable(), 'id')
    ])
    public id: string;

    @Field(returns => ID)
    @Rules([
        'filled'
    ])
    public zoneId: string

    @Field()
    public methodType: string

    @Field()
    public methodOrder: number

    @Field()
    public title: string

    @Field()
    public requires: string

    @Field()
    public value: string

    @Field()
    public taxStatus: string

    @Field()
    public cost: number
}