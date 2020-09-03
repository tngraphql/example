/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import { Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import { Timestamp } from '../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../GraphQL/Types/PaginateType';
import CommentModel from '../CommentModel';
import { UserType } from '../../../GraphQL/Types/User/UserType';
import { CommentStatusEnumType } from './CommentStatusEnumType';
import { CommentResponseToType } from './CommentResponseToType';

@ObjectType('Comment')
export class CommentType {
    static model = CommentModel

    @Field(returns => ID)
    public id: string

    @Field({ description: 'Nội dung', })
    public body(@Root() parent): string {
        if ( parent.deletedAt ) {
            return null;
        }
        return parent.body;
    };

    @Field(returns => CommentStatusEnumType, { description: 'Trạng thái' })
    public status: string;

    @Field(returns => ID, { description: 'Id bình luận cha ' })
    public parentId: string;

    @Field(returns => Int, { description: 'Tổng số trả lời bình luận', })
    public totalReply(@Root() parent): number {
        if ( ! parent.totalReply ) {
            return 0;
        }
        return parent.totalReply.$extras.total;
    }

    @Field({ description: 'Loại bình luận' })
    public commentableType: string;

    @Field(returns => ID, { description: 'ID của bài viết hoặc post tùy theo type của nó ' })
    public commentableId: string;

    @Field(returns => CommentResponseToType, { description: 'Bình luận của.' })
    public responseTo: CommentResponseToType

    @Field(returns => ID, { description: 'ID người tạo ' })
    public authorId: string;

    @Field(returns => UserType, { description: 'Người tạo ' })
    public author: UserType

    @Field(returns => Timestamp)
    public publishedAt: DateTime;

    @Field(returns => Timestamp)
    public createdAt: DateTime

    @Field(returns => Timestamp)
    public updatedAt: DateTime

    @Field(returns => Timestamp)
    public deletedAt: DateTime
}

registerPaginateType(CommentType);