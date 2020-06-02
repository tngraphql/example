/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 7:37 PM
 */
import {SortByCriteria} from "../../src/Repositories/Criteria/SortByCriteria";

import {expect} from 'chai';
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {BaseRepository} from "../../src/Repositories/Lucid/BaseRepository";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";

describe('Sort By Criteria', () => {
    let UserModel;
    let UserRepository;

    beforeEach(async () => {
        class User extends BaseModel {
            public static table = 'users'

            @column({isPrimary: true})
            id: string;

            @column()
            name: string;
        }
        class UserRepo extends BaseRepository {
            model(): LucidModel {
                return User;
            }
        }

        UserModel = User;
        UserRepository = UserRepo;
    });

    it('should sort table without error', async () => {
        const repo = new UserRepository();
        const query = repo._query;
        const sortCriteria = new SortByCriteria({id: SortEnumType.ASC, name: SortEnumType.DESC});
        sortCriteria.apply(query, repo);
        expect(query.toSQL().sql).to.deep.eq(UserModel.query().orderBy('id', SortEnumType.ASC).orderBy('name', SortEnumType.DESC).toSQL().sql)
    });
});