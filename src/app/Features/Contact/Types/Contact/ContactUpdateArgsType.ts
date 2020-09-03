import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import ContactModel from '../../ContactModel';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class ContactUpdateArgsType {
    @Field(returns => ID, { description: 'ID. contact' })
    @Rules([
        'required',
        Rule.exists(ContactModel.getTable(), 'id')
    ])
    public id: string

    @Field()
    @Rules(args => ([
        Rule.in(['read', 'unRead'])
    ]))
    public status: string
}