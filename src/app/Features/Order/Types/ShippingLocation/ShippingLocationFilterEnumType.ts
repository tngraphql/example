/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";

enum ShippingLocationFilterEnumType {
    id = 'id',
    zoneId = 'zoneId',
    code = 'code',
    type = 'type',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt'
}

registerFilterEnumType('ShippingLocation', ShippingLocationFilterEnumType);

export {ShippingLocationFilterEnumType};