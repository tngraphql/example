/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/19/2020
 * Time: 9:19 PM
 */

import { registerEnumType } from '@tngraphql/graphql';

export enum CommentStatusEnumType {
    pending = 'pending',
    approved = 'approved',
    spam = 'spam',
    trash = 'trash',
}

registerEnumType(CommentStatusEnumType, {
    name: 'CommentStatusEnum',
    description: 'Trạng thái bình luận'
});