import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { LanguageModel } from '../LanguageModel';
import { LanguageStatusEnumType } from './LanguageStatusEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class LanguageCreateArgsType {
    @Field({ description: 'Têm ngôn ngữ' })
    @Rules([
        'required',
        'max:500'
    ])
    public name: string

    @Field({ description: 'Mã ngôn ngữ vi_VN ' })
    @Rules([
        'required',
        'alpha_dash',
        'max:20',
        Rule.unique(LanguageModel.getTable(), 'locale')
    ])
    public locale: string

    @Field({ description: 'Mã ngôn ngữ ' })
    @Rules([
        'required',
        'alpha_dash',
        'max:20',
        Rule.unique(LanguageModel.getTable(), 'code')
    ])
    public code: string

    @Field(returns => Int, { description: '1: left to right, 2 right to left' })
    @Rules([
        'required',
        'max:3',
        'in:1,2'
    ])
    public direction: number

    @Field({ description: 'Lá cờ' })
    @Rules([
        'required'
    ])
    public flag: string

    @Field(returns => Int, { description: 'Vị trí' })
    @Rules([
        'max:10'
    ])
    public position: number

    @Field({ description: 'Có đặt ngôn ngữ hiện tại làm ngôn ngữ mặc định không?' })
    public default: boolean

    @Field(returns => LanguageStatusEnumType)
    public status: LanguageStatusEnumType
}