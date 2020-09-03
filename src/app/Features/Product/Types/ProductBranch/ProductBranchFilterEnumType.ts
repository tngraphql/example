/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import { registerFilterEnumType } from '../../../../GraphQL/Types/FilterType';

enum ProductBranchFilterEnumType {
    id = 'id',
    sku = 'sku',
    code = 'code',
    fullname = 'fullname',
    unitValue = 'unitValue',
    unitName = 'unitName',
    productMasterId = 'productMasterId',
    productTypeId = 'productTypeId',
    price = 'price',
    priceSale = 'priceSale',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',

    // roleId = 'role.id'
    // isMaster
}

namespace ProductBranchFilterEnumType {
    export const isMaster = function isMaster(value, operation) {
        const val = value === true || Number(value) === 1;

        return query => query.isMaster(val, operation);
    }
}

registerFilterEnumType('ProductBranch', ProductBranchFilterEnumType);

export { ProductBranchFilterEnumType };