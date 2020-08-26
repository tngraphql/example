/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";
import {converBoolean} from "../../../../../lib/utils";
import {UserModel} from "../../../../UserModel";

enum ShippingMethodFilterEnumType {
    id = 'id',
    zoneId = 'zoneId',
    methodType = 'methodType',
    methodOrder = 'methodOrder',
    title = 'title',
    requires = 'requires',
    value = 'value',
    taxStatus = 'taxStatus',
    cost = 'cost',
    isEnabled = 'isEnabled',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt'
}

registerFilterEnumType('ShippingMethod', ShippingMethodFilterEnumType);

export {ShippingMethodFilterEnumType};