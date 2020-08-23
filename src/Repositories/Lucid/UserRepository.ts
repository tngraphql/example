/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "./BaseRepository";
import {UserModel} from "../../app/UserModel";
import {Inject, registerCustomInject, Service} from "@tngraphql/illuminate";
import {ResolverData} from "@tngraphql/graphql";
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";
import {Hash} from "@tngraphql/illuminate/dist/Support/Facades/Hash";
import {ResolveLang} from "../../decorators/ResolveLang";
import {PasswordResetRepository} from "./PasswordResetRepository";

@Service()
export class UserRepository extends BaseRepository<UserModel> {
    @ResolveLang()
    public lang: any;

    @Inject(PasswordResetRepository)
    protected passwordReset: PasswordResetRepository

    public model(): typeof UserModel {
        return UserModel;
    }

    async create(data: Partial<ModelAttributes<UserModel>>): Promise<UserModel> {
        return Database.transaction<UserModel>(async trx => {
            data.password = Hash.make(data.password);

            const created = await super.create(data);

            // if ( ! Array.isArray(data.roles) ) {
            //     const role = await this.role.findOne({
            //         where: {
            //             // name: await ConfigOptions.getOption('defaultRole')
            //         }
            //     });
            //     data.roles = [role.id];
            // }

            // await created.sync('roles', data.roles);

            return created;
        })
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
