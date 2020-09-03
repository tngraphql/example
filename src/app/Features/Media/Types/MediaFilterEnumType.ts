/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import { registerFilterEnumType } from '../../../GraphQL/Types/FilterType';

enum MediaFilterEnumType {
    id = 'id',
    status = 'status',
    title = 'title',
    guid = 'guid',
    src = 'src',
    rootId = 'rootId',
    filesize = 'filesize',
    mineType = 'mineType',
    data = 'data',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('Media', MediaFilterEnumType);

export { MediaFilterEnumType };