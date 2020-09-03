/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import { registerFilterEnumType } from '../../../GraphQL/Types/FilterType';

enum LanguageFilterEnumType {
    id = 'id',
    name = 'name',
    locale = 'locale',
    code = 'code',
    direction = 'direction',
    flag = 'flag',
    position = 'position',
    default = 'default',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',

}

registerFilterEnumType('Language', LanguageFilterEnumType);

export { LanguageFilterEnumType };