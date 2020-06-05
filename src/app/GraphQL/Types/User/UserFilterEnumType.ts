/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:07 PM
 */
import {registerFilterEnumType} from "../FilterType";
import RoleModel from "../../../Models/RoleModel";
import RoleUserModel from "../../../Models/RoleUserModel";

enum UserFilterEnumType {
    id = 'id',
    phone = 'phone',
    name = 'name',
    // avatar = 'avatar',
    dob = 'dob',
    email = 'email',
    gender = 'gender',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',

    // roleId = 'roleId',
    // roleName = 'roleName',
}

namespace UserFilterEnumType {
    export const roleId = (value, operation) => {
        return (query) => {
            query.whereExists(builder => {
                builder.model = RoleModel;
                builder.from(RoleModel.getTable())
                    .innerJoin(RoleUserModel.getTable(), `${RoleUserModel.getTable()}.role_id`, '=', `${RoleModel.getTable()}.id`)
                    .whereRaw(`${RoleUserModel.getTable()}.user_id = ${query.model.getTable()}.id`)
                    .where(`${RoleModel.getTable()}.id`, operation, value);
            }, 1)
        }
    }

    export const roleName = (value, operation) => {
        return (query) => {
            query.whereExists(builder => {
                builder.model = RoleModel;
                builder.from(RoleModel.getTable())
                    .innerJoin(RoleUserModel.getTable(), `${RoleUserModel.getTable()}.role_id`, '=', `${RoleModel.getTable()}.id`)
                    .whereRaw(`${RoleUserModel.getTable()}.user_id = ${query.model.getTable()}.id`)
                    .where(`${RoleModel.getTable()}.name`, operation, value);
            }, 1)
        }
    }
}

registerFilterEnumType('User', UserFilterEnumType);

export {UserFilterEnumType}