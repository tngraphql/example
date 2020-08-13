import { DateTime } from 'luxon'
import {column, manyToMany} from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import {ManyToMany} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import PermissionModel from "./PermissionModel";
import PermissionRoleModel from "./PermissionRoleModel";
import {Str} from "../../lib/Str";

export default class RoleModel extends BaseModel {
    public static table = 'roles';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public name: string;

    @column()
    public displayName: string;

    @column()
    public description: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    isDefault?: boolean

    @manyToMany(() => PermissionModel, {
        pivotTable: PermissionRoleModel.getTable(),
        pivotForeignKey: 'role_id',
        pivotRelatedForeignKey: 'permission_id',
    })
    public permissions: ManyToMany<typeof PermissionModel>

    public static $columns: Pick<RoleModel, 'id' | 'name' | 'displayName' | 'description' | 'createdAt' | 'updatedAt'>
}
