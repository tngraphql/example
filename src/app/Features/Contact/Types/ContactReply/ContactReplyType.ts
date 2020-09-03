import { Field, ObjectType } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { DateTime } from 'luxon';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';
import ContactReplyModel from '../../ContactReplyModel';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('ContactReply')
export class ContactReplyType {
    static model = ContactReplyModel

    @Field(returns => ID)
    public id: string

    @Field()
    public message: string

    @Field(returns => ID)
    public contactId: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(ContactReplyType);