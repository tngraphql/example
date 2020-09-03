/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import { registerFilterEnumType } from '../../../../GraphQL/Types/FilterType';
import { converBoolean } from '../../../../../lib/utils';
import { UserModel } from '../../../../UserModel';

enum ShippingZoneFilterEnumType {
    id = 'id',
    name = 'name',
    zoneOrder = 'zoneOrder',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
}

registerFilterEnumType('ShippingZone', ShippingZoneFilterEnumType);

export { ShippingZoneFilterEnumType };