/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";
import {converBoolean} from "../../../../../lib/utils";
import {UserModel} from "../../../../UserModel";

enum OrderFilterEnumType {
    id = 'id',
    code = 'code',
    orderStatusId = 'orderStatusId',
    totalOrigin = 'totalOrigin',
    total = 'total',
    discount = 'discount',
    customerId = 'customerId',
    customerGroupId = 'customerGroupId',
    ip = 'ip',
    forwardedIp = 'forwardedIp',
    userAgent = 'userAgent',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
}

registerFilterEnumType('Order', OrderFilterEnumType);

export {OrderFilterEnumType};