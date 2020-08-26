/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:32 AM
 */
import {Field, ObjectType} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ShippingZoneModel} from "../../Models/ShippingZoneModel";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import {ShippingLocationType} from "../ShippingLocation/ShippingLocationType";
import {ShippingMethodType} from "../ShippingMethod/ShippingMethodType";

@ObjectType('ShippingZone')
export class ShippingZoneType {
    static model = ShippingZoneModel

    @Field(returns => ID)
    public id: string

    @Field()
    public name: string;

    @Field()
    public zoneOrder: number;

    @Field(returns => [ShippingLocationType])
    public location: ShippingLocationType[];

    @Field(returns => [ShippingMethodType])
    public methods: ShippingMethodType[];

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(ShippingZoneType);