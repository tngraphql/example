/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "./BaseRepository";
import {UserModel} from "../../app/UserModel";
import {registerCustomInject, Service} from "@tngraphql/illuminate";
import {ResolverData} from "@tngraphql/graphql";
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";
import {Hash} from "@tngraphql/illuminate/dist/Support/Facades/Hash";

const ResolveLang = registerCustomInject((data: ResolverData<{lang: any}>) => {
    return data.context.lang;
})

@Service()
export class UserRepository extends BaseRepository<UserModel> {
    @ResolveLang() public lang: any

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
}
