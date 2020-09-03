import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import ContactReplyModel from '../../ContactReplyModel';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class ContactReplyUpdateArgsType {
    @Field(returns => ID, { description: 'ID. contact reply' })
    @Rules([
        'required',
        Rule.exists(ContactReplyModel.getTable(), 'id')
    ])
    public id: string

    @Field()
    public message: string;

    @Field(returns => ID)
    public contactId: string;

}