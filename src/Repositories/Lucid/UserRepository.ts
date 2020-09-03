/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import { BaseRepository } from './BaseRepository';
import { UserModel } from '../../app/UserModel';
import { Inject, registerCustomInject, Service } from '@tngraphql/illuminate';
import { ResolverData } from '@tngraphql/graphql';
import { ModelAttributes } from '@tngraphql/lucid/build/src/Contracts/Model/LucidRow';
import { Database } from '@tngraphql/illuminate/dist/Support/Facades';
import { Hash } from '@tngraphql/illuminate/dist/Support/Facades/Hash';
import { ResolveLang } from '../../decorators/ResolveLang';
import { PasswordResetRepository } from './PasswordResetRepository';
import RoleModel from '../../app/Models/RoleModel';
import { ConfigOptions } from '../../lib/ConfigOptions';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

@Service()
export class UserRepository extends BaseRepository<UserModel> {
    @ResolveLang()
    public lang: any;

    @Inject(PasswordResetRepository)
    protected passwordReset: PasswordResetRepository

    public model(): typeof UserModel {
        return UserModel;
    }

    async create(data): Promise<UserModel> {
        return this.transaction(async trx => {
            data.password = Hash.make(data.password);

            const created = await super.create(data);

            if ( ! Array.isArray(data.roles) ) {
                const role = await RoleModel.query().where('name', await ConfigOptions.getOption('defaultRole'))
                                            .first();

                data.roles = [role.id];
            }

            await created.related('roles').sync(data.roles);

            return created;
        });
    }

    async update(data, id: any, attribute: string = this.getKeyName()): Promise<UserModel> {
        return this.transaction(async () => {
            if ( data.password ) {
                data.password = Hash.make(data.password);
            }

            const updated = await super.update(data, id);

            if ( data.roles ) {
                await updated.related('roles').sync(data.roles);
            }

            return updated;
        })
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        let instance = id;

        if ( ! (id instanceof BaseModel) ) {
            const query = this.newQuery();

            instance = await query.where(attribute, id).first();
        }

        if ( ! instance ) {
            return 0;
        }

        // Cấm xóa
        if ( ['1'].includes(instance.id) ) {
            // 'Bạn không thể xóa tài khoản này'
            throw new Error(this.lang.t('You are not authorized to delete this user.'));
        }

        return instance.delete();
    }

    /**
     * Làm mới mật khẩu
     *
     * @param data
     * @return {Promise<any>}
     */
    public resetPassword(data): Promise<number | UserModel> {
        return this.transaction(async () => {
            return this.passwordReset.reset(data, () => {
                return this.newQuery().where('email', data.email)
                           .update({
                               password: Hash.make(data.password) // bcrypt.hashSync(data.password, salt)
                           });
            });
        });
    }

    /**
     * Đổi mật khẩu
     * @param password
     * @param id
     * @return {Promise<this>}
     */
    public async changePassword(password, id) {
        const instance = await this.firstBy(id);
        instance.password = Hash.make(password);
        return instance.save();
    }

    /**
     * Kiểm tra mật khẩu.
     *
     * @param {any} email
     * @param {any} password
     * @return {Promise<any>}
     */
    public async comparePassword({ email, password }): Promise<UserModel> {
        const user = await this.firstBy(email, 'email', ['id', 'password']);

        if ( ! user || ! Hash.check(password, user.password) ) {
            return;
        }

        return user;
    }
}
