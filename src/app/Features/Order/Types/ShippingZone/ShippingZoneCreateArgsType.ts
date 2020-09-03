/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export class ShippingZoneCreateArgsType {
    @Field()
    public name: string;

    @Field(returns => [GraphQLString])
    public country: string[];

    @Field(returns => [GraphQLString])
    public postcode: string[];

}