import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {Resolver} from "@tngraphql/graphql";
import {UserModel} from "../../UserModel";
import {ResolveAuth} from "../../../decorators/ResolveAuth";
import {AuthorizationException, Guard} from "@tngraphql/guard/dist/src";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:59 PM
 */

@Resolver()
export class BaseResolve {
    public repo: BaseRepository;

    @ResolveAuth()
    public user: UserModel;

    public async authorize(ability, args = {}) {
        const guard = Guard.setDefaultUser(this.user);

        if (!await guard.allows(ability, args as any, this.user)) {
            throw new AuthorizationException('This action is unauthorized.');
        }
    }
}