/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {registerFilterEnumType} from "../../../GraphQL/Types/FilterType";

enum CommentFilterEnumType {
    id = 'id',
    body = 'body',
    authorId = 'authorId',
    parentId = 'parentId',
    status = 'status',
    commentableType = 'commentableType',
    commentableId = 'commentableId',
    publishedAt = 'publishedAt',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
}

registerFilterEnumType('Comment', CommentFilterEnumType);

export {CommentFilterEnumType};