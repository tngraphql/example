/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {registerFilterEnumType} from "../../../GraphQL/Types/FilterType";
import {converBoolean} from "../../../../lib/utils";
import {UserModel} from "../../../UserModel";

enum MenuFilterEnumType {
    id = 'id',
    name = 'name',
    status = 'status',
    description = 'description',
    language = 'language',
    languageMaster = 'languageMaster',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
}

registerFilterEnumType('Menu', MenuFilterEnumType);

export {MenuFilterEnumType};