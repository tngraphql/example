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
import {GraphQLString} from "graphql";
import {ShippingZoneModel} from "../../Models/ShippingZoneModel";


@ArgsType()
export class ShippingZoneUpdateArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(ShippingZoneModel.getTable(), 'id')
    ])
    public id: string;

    @Field()
    public name: string;

    @Field(returns => [GraphQLString])
    public country: string[];

    @Field(returns => [GraphQLString])
    public postcode: string[];
}