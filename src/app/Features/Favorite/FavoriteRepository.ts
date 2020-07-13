/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 8:17 AM
 */

import {registerCustomInject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import FavoriteModel from "./FavoriteModel";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";

const ResolveAuth = registerCustomInject(({context}) => {
    return context.auth;
})

@Service()
export class FavoriteRepository extends BaseRepository<FavoriteModel> {
    @ResolveAuth()
    protected auth: RequestGuard;

    public model(): typeof FavoriteModel {
        return FavoriteModel;
    }

    public async create(data): Promise<FavoriteModel> {
        if ( await this.auth.check() ) {
            data.userId = await this.auth.id();
        }

        return super.create(data);
    }
}