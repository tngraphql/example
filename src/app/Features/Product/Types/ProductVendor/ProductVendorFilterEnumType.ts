/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";

enum ProductVendorFilterEnumType {
    id = 'id',
    name = 'name',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt'
}

registerFilterEnumType('ProductVendor', ProductVendorFilterEnumType);

export {ProductVendorFilterEnumType};