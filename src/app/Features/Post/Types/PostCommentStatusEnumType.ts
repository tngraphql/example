/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import {registerEnumType} from "@tngraphql/graphql";

enum PostCommentStatusEnumType {
    open = 'open',
    closed = 'closed'
}

registerEnumType(PostCommentStatusEnumType, {
    name: 'PostCommentStatus',
    description: 'Trạng thái bình luận của bài viết'
});

export {PostCommentStatusEnumType};