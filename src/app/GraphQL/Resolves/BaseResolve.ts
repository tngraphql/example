import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {Resolver} from "@tngraphql/graphql";
import {UserModel} from "../../UserModel";
import {ResolveAuth} from "../../../decorators/ResolveAuth";
import {AuthorizationException, Guard} from "@tngraphql/guard/dist/src";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";

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
    public auth: RequestGuard;

    public async authorize(ability, args = {}) {
        const guard = Guard.setDefaultUser(await this.auth.user());

        if (!await guard.allows(ability, args as any, await this.auth.user())) {
            throw new AuthorizationException('This action is unauthorized.');
        }
    }
}