/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 8:22 AM
 */

import {registerEnumType} from "@tngraphql/graphql";

export enum FavoriteTypeEnumType {
    // Yêu thích bài viết
    post = 'post',

    // Yêu thích page
    page = 'page',

    // Yêu thích sản phẩm
    product = 'product'
}

registerEnumType(FavoriteTypeEnumType, {name: 'FavoriteTypeEnum'});