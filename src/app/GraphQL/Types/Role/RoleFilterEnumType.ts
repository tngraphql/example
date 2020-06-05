/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerFilterEnumType} from "../FilterType";

enum RoleFilterEnumType {
    id = 'id',
    name = 'name',
    displayName = 'displayName',
    description = 'description',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('Role', RoleFilterEnumType);

export {RoleFilterEnumType};