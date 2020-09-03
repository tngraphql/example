/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import TagModel from '../TagModel';

@ArgsType()
export class TagCreateArgsType {
    @Field({ description: 'Tên thẻ nhãn' })
    @Rules([
        'required',
        'between:2,255',
        Rule.unique(TagModel.getTable(), 'name')
    ])
    public name: string

    @Field({ description: 'Slug là phiên bản thân thiện với URL của tên.' })
    @Rules([
        'filled',
        'alpha_dash',
        Rule.unique(TagModel.getTable(), 'slug')
    ])
    public slug: string
}