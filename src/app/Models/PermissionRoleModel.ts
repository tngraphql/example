import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class PermissionRoleModel extends BaseModel {
    public static table = 'permission_role'

    @column({ isPrimary: true, consume: value => String(value) })
    public id: string

    @column({ consume: value => String(value)})
    public permissionId: string

    @column({ consume: value => String(value)})
    public roleId: string

    public static $columns: Pick<PermissionRoleModel, 'id' | 'permissionId' | 'roleId'>
}
