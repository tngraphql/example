import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import CategoryModel from '../CategoryModel';
import { MetaInput } from '../../../GraphQL/Types/Input/MetaInput';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class CategoryUpdateArgsType {
    @Field(returns => ID, { description: 'ID. contact' })
    @Rules([
        'required',
        Rule.exists(CategoryModel.getTable(), 'id')
    ])
    public id: string

    @Field({ description: 'Tên danh mục' })
    @Rules(args => ([
        'filled',
        'between:2,255',
        Rule.unique(CategoryModel.getTable(), 'name')
            .where('parent_id', args.parentId)
            .ignore(args.id)
    ]))
    public name: string

    @Field()
    @Rules(args => ([
        'filled',
        'alpha_dash',
        Rule.unique(CategoryModel.getTable(), 'slug').ignore(args.id)
    ]))
    public slug: string;

    @Field({ description: 'Mô tả' })
    public description: string;

    @Field({ description: 'Nội dung' })
    public content: string;

    @Field(returns => ID, { description: 'Danh mục cha', })
    public parentId: string;

    @Field(returns => Int, { description: 'Sắp xếp', })
    public categoryOrder: number;

    @Field({ description: 'Seo title' })
    public seoTitle: string;

    @Field({ description: 'Seo description' })
    public seoDescription: string;

    @Field({ description: 'Seo keyword' })
    public seoKeyword: string;

    @Field(returns => [MetaInput], { description: 'Các trường tự do.' })
    public meta: MetaInput[];
}