/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerFilterEnumType} from "../FilterType";
import OptionModel from "../../../Models/OptionModel";
import {empty} from "../../../../lib/utils";
import Arr from "../../../../lib/Arr";

enum RoleFilterEnumType {
    id = 'id',
    name = 'name',
    displayName = 'displayName',
    description = 'description',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

namespace RoleFilterEnumType {
    export const isDefault = function (val, operation) {
        const [value] = Arr.wrap(val);

        const method = !empty(value) ? 'where' : 'whereNot';

        return query => {
            query[method](query => {
                query.where('name', operation, builder => {
                    builder.from(OptionModel.getTable())
                        .select('value')
                        .where('name', 'defaultRole')
                });
            });
        }
    }
}

registerFilterEnumType('Role', RoleFilterEnumType);

export {RoleFilterEnumType};