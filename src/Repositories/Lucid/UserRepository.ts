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

const ResolveLang = registerCustomInject((data: ResolverData<{lang: any}>) => {
    return data.context.lang;
})

@Service()
export class UserRepository extends BaseRepository<UserModel> {
    @ResolveLang() public lang: any

    model(): typeof UserModel {
        return UserModel;
    }
}
