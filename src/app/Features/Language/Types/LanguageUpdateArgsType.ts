/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import {ArgsType, Field} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {LanguageModel} from "../LanguageModel";

@ArgsType()
export class LanguageUpdateArgsType {
    @Field(returns => ID, {description: 'ID. tag'})
    @Rules([
        'required',
        Rule.exists(LanguageModel.getTable(), 'id')
    ])
    public id: string

    @Field({description: 'Tên thẻ nhãn'})
    @Rules(args => ([
        'filled',
        'between:2,255',
        Rule.unique(LanguageModel.getTable(), 'name').ignore(args.id)
    ]))
    public name: string

    @Field({description: 'slug là phiên bản thân thiện với URL của tên.'})
    @Rules(args => ([
        'filled',
        'alpha_dash',
        Rule.unique(LanguageModel.getTable(), 'slug').ignore(args.id)
    ]))
    public slug: string
}