import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import ContactModel from '../../ContactModel';
import { ID } from '../../../../GraphQL/Types/UidScalerType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class ContactReplyCreateArgsType {
    @Field()
    @Rules([
        'required'
    ])
    public message: string

    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(ContactModel.getTable(), 'id')
    ])
    public contactId: string;
}