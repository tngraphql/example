/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";

enum ContactFilterEnumType {
    id = 'id',
    name = 'name',
    email = 'email',
    phone = 'phone',
    address = 'address',
    content = 'content',
    subject = 'subject',
    status = 'status',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('Contact', ContactFilterEnumType);

export {ContactFilterEnumType};