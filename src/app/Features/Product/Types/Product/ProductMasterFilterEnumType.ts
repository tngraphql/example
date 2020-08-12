/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";
import {converBoolean} from "../../../../../lib/utils";

enum ProductMasterFilterEnumType {
    id = 'id',
    name = 'name',
    content = 'content',
    productTypeId = 'productTypeId',
    productVendorId = 'productVendorId',
    imageType = 'imageType',
    // isFeatured = 'isFeatured',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
    categoryId = 'category.id',
    categorySlug = 'category.slug',
    tagId = 'tag.id',
    tagSlug = 'tag.slug',
    views = 'views',
    commentStatus = 'commentStatus',
    commentCount = 'commentCount'
}

namespace ProductMasterFilterEnumType {
    export const isFeatured = function isFeatured(value, operation) {
        const val = converBoolean(String(Number(eval(value))), '1', '0');

        return query => query.where('isFeatured', operation, val);
    }
}

registerFilterEnumType('ProductMaster', ProductMasterFilterEnumType);

export {ProductMasterFilterEnumType};