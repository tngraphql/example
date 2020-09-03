/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/26/2020
 * Time: 4:17 PM
 */

import { registerEnumType } from '@tngraphql/graphql';

export enum CommentableEnumType {
    post = 'post',
    product = 'product',
    page = 'page',
}

registerEnumType(CommentableEnumType, {
    name: 'Commentable',
    description: 'Loại bình luận'
});