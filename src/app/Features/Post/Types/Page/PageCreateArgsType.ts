import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { MetaInput } from '../../../../GraphQL/Types/Input/MetaInput';
import { PostModel } from '../../PostModel';
import { GraphQLString } from 'graphql';
import { DateTime } from 'luxon';
import CategoryModel from '../../../Category/CategoryModel';
import { PostCommentStatusEnumType } from '../Post/PostCommentStatusEnumType';
import { PageStatusEnumType } from './PageStatusEnumType';
import { PageModel } from '../../PageModel';
import {PostStatusEnumType} from "../Post/PostStatusEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class PageCreateArgsType {
    @Field({ description: 'Tên bài viết' })
    @Rules(args => ([
        'required',
        'between:2,255'
    ]))
    public name: string

    @Field({ description: 'Hình đại diện' })
    public avatar: string;

    @Field(returns => PostStatusEnumType, { defaultValue: 'publish', description: 'Trạng thái của bài viết.', })
    public postStatus: string = 'publish';

    @Field({ description: 'Mật khẩu của bài viết nếu có.', })
    @Rules([
        'between:2,30'
    ])
    public postPassword: string;

    @Field(returns => PostCommentStatusEnumType, {
        description: 'Trạng thái được phép bình luận bài viết.',
        defaultValue: 'open'
    })
    public commentStatus: string;

    @Field({ description: 'Slug' })
    public slug: string;

    @Field({ description: 'ID bài viết cha', defaultValue: '0' })
    @Rules(args => {
        if ( String(args.parentId) !== '0' ) {
            return [
                Rule.exists(PageModel.getTable(), 'id')
            ]
        }
        return [];
    })
    public parentId: string = '0';

    @Field({ description: 'Mô tả' })
    public description: string;

    @Field({ description: 'Nội dung', })
    @Rules(['required'])
    public content: string;

    @Field(returns => [GraphQLString], { description: 'Gắn tag bài viết', })
    public tags: string[];

    @Field(returns => [ID], { description: 'Chọn danh mục bài viết.', defaultValue: '1' })
    public categories: string[];

    @Field({ description: 'Seo title' })
    public seoTitle: string;

    @Field({ description: 'Seo description' })
    public seoDescription: string;

    @Field({ description: 'Seo keyword' })
    public seoKeyword: string;

    @Field(returns => [MetaInput], { description: 'Các trường tự do.' })
    public meta: MetaInput[];

    public authorId?: string;

    public publishedAt?: DateTime;

}