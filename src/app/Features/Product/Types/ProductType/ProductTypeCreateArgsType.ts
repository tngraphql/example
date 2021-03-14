import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ProductTypeModel } from '../../Models/ProductTypeModel';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { MetaInput } from '../../../../GraphQL/Types/Input/MetaInput';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class ProductTypeCreateArgsType {
    @Field({ description: 'Tên danh mục' })
    @Rules(args => ([
        'required',
        'between:2,255',
        Rule.unique(ProductTypeModel.getTable(), 'name').where('parent_id', args.parentId)
    ]))
    public name: string

    @Field()
    @Rules([
        'filled',
        'alpha_dash',
        Rule.unique(ProductTypeModel.getTable(), 'slug')
    ])
    public slug: string;

    @Field({ description: 'Mô tả' })
    public description: string;

    @Field({ description: 'Nội dung' })
    public content: string;

    @Field({ description: 'Nội dung' })
    public content2: string;

    @Field(returns => ID, { description: 'Danh mục cha', })
    public parentId: string = '0';

    @Field(returns => Int, { description: 'Sắp xếp', defaultValue: '0' })
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