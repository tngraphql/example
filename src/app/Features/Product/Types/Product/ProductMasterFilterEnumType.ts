/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import { registerFilterEnumType } from '../../../../GraphQL/Types/FilterType';
import { converBoolean } from '../../../../../lib/utils';

enum ProductMasterFilterEnumType {
    id = 'id',
    name = 'name',
    kind = 'kind',
    content = 'content',
    description = 'description',
    productTypeId = 'productTypeId',
    productVendorId = 'productVendorId',
    imageType = 'imageType',
    // isFeatured = 'isFeatured',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
    categoryId = 'categories.id',
    categorySlug = 'categories.slug',
    tagId = 'tags.id',
    tagSlug = 'tags.slug',
    views = 'views',
    commentStatus = 'commentStatus',
    commentCount = 'commentCount',
    attributeId = 'allAttribute.attributeId',
    attributeValue = 'allAttribute.attribute.name',
}

namespace ProductMasterFilterEnumType {
    export const isFeatured = function isFeatured(value, operation) {
        const val = value === true || Number(value) === 1;

        return query => query.isFeatured(val, operation);
    }
}

registerFilterEnumType('ProductMaster', ProductMasterFilterEnumType);

export { ProductMasterFilterEnumType };