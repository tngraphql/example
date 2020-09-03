/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/13/2020
 * Time: 11:57 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { belongsTo, column, hasMany, hasOne, manyToMany } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { Auth } from '@tngraphql/auth/dist/src/Auth';
import UserSocialModel from './Models/UserSocialModel';
import { HasMany, ManyToMany } from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';
import RoleModel from './Models/RoleModel';
import { DateTime } from 'luxon';
import { Str } from '../lib/Str';
import { GenderEnumType } from './GraphQL/Types/GenderEnumType';

export class UserModel extends Auth {
    public static table = 'users';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string;

    @column()
    public phone: string;

    @column()
    public password: string;

    @column()
    public name: string;

    @column()
    public avatar: string;

    @column.date()
    public dob: DateTime;

    @column()
    public email: string;

    @column()
    public gender: GenderEnumType;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column()
    public deletedAt: DateTime;

    @manyToMany(() => RoleModel, {
        pivotTable: 'role_user',
        pivotForeignKey: 'user_id',
        pivotRelatedForeignKey: 'role_id',
    })
    public roles: ManyToMany<typeof RoleModel>

    @hasMany(() => UserSocialModel)
    public socialAccounts: HasMany<typeof UserSocialModel>

    public isOwner() {
        return this.id === '1';
    }

    protected promiseLoadRoles;

    public async cachedRoles() {
        const user = this as UserModel;

        if ( user.roles ) {
            return user.roles;
        }

        if ( ! this.promiseLoadRoles ) {

            this.promiseLoadRoles = user.preload((preloader) => {
                preloader.preload('roles', builder => {
                });
            });
        }

        await this.promiseLoadRoles;

        this.promiseLoadRoles = null;

        return user.roles;
    }

    public async can(permission: string | string[], requireAll = false): Promise<boolean> {
        if ( Array.isArray(permission) ) {
            for( const permissionName of permission ) {
                const hasPerm = this.can(permissionName);

                if ( hasPerm && ! requireAll ) {
                    return true
                } else if ( ! hasPerm && requireAll ) {
                    return false
                }
            }
            return requireAll;
        } else {
            const roles = await this.cachedRoles();

            for( const role of roles ) {
                const permissions = await role.cachedPermissions();
                for( const perm of permissions ) {
                    if ( Str.is(permission, perm.name) ) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
