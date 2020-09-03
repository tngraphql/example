/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import { registerEnumType } from '@tngraphql/graphql';

enum PostStatusEnumType {
    publish = 'publish', // 'Trạng thái hiển thị với tất cả mọi người.'
    private = 'private', // Trạng thái riêng tư. Chỉ có quản trị viên và biên tập viên có thể xem bài đăng này.
    protected = 'protected', // Trạng thái riêng tư. Chỉ có quản trị viên và biên tập viên có thể xem bài đăng này.
    draft = 'draft', // Trạng thái lưu nháp.
}

registerEnumType(PostStatusEnumType, {
    name: 'PostStatus',
    description: 'Trạng thái bài viết'
});

export { PostStatusEnumType };