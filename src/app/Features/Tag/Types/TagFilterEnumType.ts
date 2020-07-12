/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import {registerFilterEnumType} from "../../../GraphQL/Types/FilterType";

enum TagFilterEnumType {
    id = 'id',
    name = 'name',
    slug = 'slug',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('Tag', TagFilterEnumType);

export {TagFilterEnumType};