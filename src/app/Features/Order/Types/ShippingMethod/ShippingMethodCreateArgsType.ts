/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../../GraphQL/Types/UidScalerType';

@ArgsType()
export class ShippingMethodCreateArgsType {

    @Field(returns => ID)
    @Rules([
        'required'
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

    @Field()
    public isEnabled: boolean
}