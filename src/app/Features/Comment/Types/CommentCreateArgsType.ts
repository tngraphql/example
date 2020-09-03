import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../GraphQL/Types/UidScalerType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class CommentCreateArgsType {
    @Field(returns => ID, { description: 'ID bình luận cha.', defaultValue: '0' })
    public parentId: string;

    @Field({ description: 'Nội dung bình luận.', })
    @Rules(args => ([
        'required',
    ]))
    public body: string

    public commentableId: string;

    public commentableType: string;
}