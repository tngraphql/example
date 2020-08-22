/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import {registerEnumType} from "@tngraphql/graphql";

enum MenuItemTypeEnumType {
    post = 'post', // Liên kết bài viết
    page = 'page', // Liên kết tới page
    tag = 'tag', // Liên kết tới tag
    category = 'category', // Liên kết tới chuyên mục
    productType = 'productType', // Liên kết tới danh mục sản phẩm
    product = 'product', // Liên kết tới sản phẩm
    customLink = 'customLink', // Liên kết tùy chọn.
}

registerEnumType(MenuItemTypeEnumType, {
    name: 'MenuItemTypeEnum',
    description: 'Loại liên kết menu.'
});

export {MenuItemTypeEnumType};