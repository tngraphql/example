import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { Str } from '../../lib/Str';

export default class RoleUserModel extends BaseModel {
    public static table = 'role_user';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column({ consume: value => Str.toString(value) })
    public userId: string

    @column({ consume: value => Str.toString(value) })
    public roleId: string

    public static $columns: Pick<RoleUserModel, 'id' | 'userId' | 'roleId'>
}
