import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class PermissionRoleModel extends BaseModel {
    public static table = 'permission_role'

    @column({ isPrimary: true })
    public id: number

    @column()
    public permissionId: number

    @column()
    public roleId: number

    public static $columns: Pick<PermissionRoleModel, 'id' | 'permissionId' | 'roleId'>
}
