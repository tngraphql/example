/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 8:17 AM
 */

import {registerCustomInject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import FavoriteModel from "./FavoriteModel";
import {ResolveAuth} from "../../../decorators/ResolveAuth";
import {AuthContract} from "@tngraphql/auth/dist/src/Contract/AuthContract";

@Service()
export class FavoriteRepository extends BaseRepository<FavoriteModel> {
    @ResolveAuth()
    protected auth: AuthContract;

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