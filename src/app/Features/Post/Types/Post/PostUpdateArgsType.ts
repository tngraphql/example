import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {MetaInput} from "../../../../GraphQL/Types/Input/MetaInput";
import {PostModel} from "../../PostModel";
import {PostStatusEnumType} from "./PostStatusEnumType";
import {PostCommentStatusEnumType} from "./PostCommentStatusEnumType";
import {GraphQLString} from "graphql";
import CategoryModel from "../../../Category/CategoryModel";
import {HTML} from "../../../../GraphQL/Types/ScalarType/HtmlScalerType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class PostUpdateArgsType {
    @Field(returns => ID, {description: 'ID bài viết',})
    @Rules([
        'required',
        Rule.exists(PostModel.getTable(), 'id')
    ])
    public id?: string

    @Field({description: 'Tên bài viết'})
    @Rules(args => ([
        'filled',
        'between:2,255'
    ]))
    public name?: string

    @Field(returns => Int,{description: 'Format'})
    public format?: number;

    @Field({description: 'Hình đại diện'})
    public avatar?: string;

    @Field(returns => ID, {description: 'Trạng thái của bài viết.',})
    public thumbnailId?: string;

    @Field(returns => PostStatusEnumType, {defaultValue: 'publish', description: 'Trạng thái của bài viết.',})
    public postStatus?: string = 'publish';

    @Field({description: 'Mật khẩu của bài viết nếu có.',})
    @Rules([
        'between:2,30'
    ])
    public postPassword?: string;

    @Field(returns => PostCommentStatusEnumType, {
        description: 'Trạng thái được phép bình luận bài viết.',
        defaultValue: 'open'
    })
    public commentStatus?: string;

    @Field({description: 'Slug'})
    public slug?: string;

    @Field(returns => HTML, {description: 'Mô tả'})
    public description?: string;

    @Field(returns => HTML, {description: 'Nội dung',})
    @Rules(['filled'])
    public content?: string;

    @Field(returns => [GraphQLString], {description: 'Gắn tag bài viết',})
    public tags?: string[];

    @Field(returns => [ID], {description: 'Chọn danh mục bài viết.', defaultValue: '1'})
    @Rules(['filled', Rule.exists(CategoryModel.getTable(), 'id')])
    public categories?: string[];

    @Field({description: 'Seo title'})
    public seoTitle?: string;

    @Field({description: 'Seo description'})
    public seoDescription?: string;

    @Field({description: 'Seo keyword'})
    public seoKeyword?: string;

    @Field(returns => [MetaInput], {description: 'Các trường tự do.'})
    public meta?: MetaInput[];

    public isFeatured?: boolean
}