/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ShippingZoneFilterEnumType} from "./ShippingZoneFilterEnumType";
import {ShippingZoneSortInputType} from "./ShippingZoneSortInputType";

@ArgsType()
export class ShippingZoneListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ShippingZoneFilterEnumType))
    filter: FilterContract<typeof ShippingZoneFilterEnumType>

    @Field(returns => [ShippingZoneSortInputType],{description: 'order'})
    sortBy: ShippingZoneSortInputType

    where: any;

    order: any;
}