import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class RoleUserModel extends BaseModel {
    public static table = 'role_user';

    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @column()
    public roleId: number

    public static $columns: Pick<RoleUserModel, 'id' | 'userId' | 'roleId'>
}
