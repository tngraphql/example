import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import CommentModel from '../CommentModel';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { CommentStatusEnumType } from './CommentStatusEnumType';
import { CommentableEnumType } from './CommentableEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class CommentPostUpdateArgsType {
    @Field({ description: 'ID bình luận.', })
    @Rules(args => [
        'required',
        Rule.exists(CommentModel.getTable(), 'id').where('commentable_type', CommentableEnumType.post)
    ], ({ lang }) => ({
        'exists': lang.t('Can\'t find id comment')
    }))
    public id: string;

    @Field({ description: 'Nội dung bình luận.', })
    @Rules(args => ([
        'filled',
    ]))
    public body: string

    @Field(returns => CommentStatusEnumType, { description: 'Trạng thái bài viết', })
    @Rules(args => ([
        'filled',
    ]))
    public status: string
}