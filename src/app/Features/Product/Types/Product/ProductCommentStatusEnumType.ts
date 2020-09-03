/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 8:47 AM
 */
import { registerEnumType } from '@tngraphql/graphql';

enum ProductCommentStatusEnumType {
    open = 'open',
    closed = 'closed'
}

registerEnumType(ProductCommentStatusEnumType, {
    name: 'ProductCommentStatus',
    description: 'Trạng thái bình luận của bài viết'
});

export { ProductCommentStatusEnumType };