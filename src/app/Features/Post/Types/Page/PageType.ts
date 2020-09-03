import { Arg, Ctx, Directive, Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';
import { PageModel } from '../../PageModel';
import { CategoryType } from '../../../Category/Types/CategoryType';
import { UserType } from '../../../../GraphQL/Types/User/UserType';
import { TagType } from '../../../Tag/Types/TagType';
import { PageMetaType } from './PageMetaType';
import { PageOtherLanguageType } from './PageOtherLanguageType';
import { Str } from '../../../../../lib/Str';
import { ContentFormatEnumType } from '../../../../GraphQL/Types/ContentFormatEnumType';
import { htmlField } from '../../../../../lib/utils';
import { GraphQLString } from 'graphql';
import { HTML } from '../../../../GraphQL/Types/ScalarType/HtmlScalerType';
import { PageStatusEnumType } from './PageStatusEnumType';
import { PostCommentStatusEnumType } from '../Post/PostCommentStatusEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Page')
export class PageType {
    static model = PageModel

    @Field(returns => ID)
    public id: string

    @Field({ description: 'Tên bài viết' })
    public name: string;

    @Field(returns => ID, { description: 'ID tác giả bài viết' })
    public authorId: string;

    @Field(returns => ID, { description: 'Bài viết cha.' })
    public parentId: string;

    @Field({ description: 'Hình đại diện' })
    public avatar: string;

    @Field(returns => ID)
    public thumbnailId: string;

    // todo chưa có thumbnail
    @Field()
    public thumbnail: string;

    @Field()
    public slug(@Root() parent): string {
        return Str.slug(parent.name);
    };

    @Field(returns => HTML)
    @Directive('@cost(complexity: 2)')
    public async description(
        @Root() parent,
        @Arg('maxLength', returns => Int) maxLength: number,
        @Arg('format', returns => ContentFormatEnumType, { defaultValue: 'HTML' }) format: number,
        @Ctx() ctx
    ) {
        // Cannot determine GraphQL output type for description
        const { auth, guard } = ctx;
        const args = { maxLength, format };
        if ( await auth.id() === parent.authorId ) {
            return htmlField(parent.description, args);
        }

        if ( guard.any(['post-update', 'post-delete']) ) {
            return htmlField(parent.description, args);
        }

        if ( parent.feesPage ) {
            return htmlField(parent.description, args);
        }

        if ( parent.fees > 0 ) {
            return null;
        }

        return htmlField(parent.description, args);
    };

    @Field(returns => HTML, { description: 'Nội dung bài viết', })
    @Directive('@cost(complexity: 10)')
    public async content(
        @Root() parent,
        @Arg('maxLength', returns => Int) maxLength: number,
        @Arg('format', returns => ContentFormatEnumType, { defaultValue: 'HTML' }) format: number,
        @Ctx() ctx
    ) {
        return htmlField(parent.content, { maxLength, format });
    };

    @Field(returns => UserType, { description: 'Tác giả bài viết.' })
    public author: UserType;

    @Field(returns => Int, { description: 'Số bình luận' })
    public commentCount: number;

    @Field(returns => Int, { description: 'Số bài viết con', })
    public subCount(@Root() parent): number {
        if ( parent.subCount ) {
            return parent.subCount.$extras.total;
        }

        return 0;
    };

    @Field(returns => PostCommentStatusEnumType, { description: 'Trạng thái được phép bình luận bài viết' })
    public commentStatus: string;

    @Field(returns => PageStatusEnumType, { description: 'Trạng thái bài viết' })
    public postStatus: string;

    @Field(returns => GraphQLString, { description: 'Mật khẩu bài post', })
    public async postPassword(
        @Root() parent,
        @Ctx() { auth }
    ) {
        if ( await auth.id() === '1' ) {
            return parent.postPassword;
        }

        return !! parent.postPassword;
    };

    @Field({ description: 'Seo title' })
    public seoTitle: string;

    @Field({ description: 'Seo description' })
    public seoDescription: string;

    @Field({ description: 'Seo keyword' })
    public seoKeyword: string;

    @Field(returns => [PageMetaType], { description: 'Trường tùy chỉnh.' })
    public meta: PageMetaType[];

    @Field(returns => ID, { description: 'ID ngôn ngữ ' })
    public language: string;

    @Field(returns => ID, { description: 'ID ngôn ngữ được tạo ra đầu tiên' })
    public languageMaster: string;

    @Field(returns => [PageOtherLanguageType], { description: 'Những ngôn ngữ khác' })
    public otherLanguages: PageOtherLanguageType[];

    @Field(returns => TimestampScalarType, { description: 'Thời gian xuất bản' })
    public publishedAt: DateTime

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(PageType);