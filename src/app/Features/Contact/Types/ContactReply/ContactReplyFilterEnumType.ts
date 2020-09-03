/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import { registerFilterEnumType } from '../../../../GraphQL/Types/FilterType';

enum ContactReplyFilterEnumType {
    id = 'id',
    message = 'message',
    contactId = 'contactId',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('ContactReply', ContactReplyFilterEnumType);

export { ContactReplyFilterEnumType };