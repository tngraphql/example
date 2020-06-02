import {HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 7:36 PM
 */
require('../support');
import {expect} from 'chai';
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {SelectionCriteria} from "../../src/Repositories/Criteria/SelectionCriteria";
import {BaseRepository} from "../../src/Repositories/Lucid/BaseRepository";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {join} from "path";
import {Kernel} from "../../src/app/GraphQL/Kernel";
import {Application} from "@tngraphql/illuminate";
import {cleanup, setup} from "../helpers";
import {RelationQueryBuilderContract} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/RelationQueryBuilderContract";

describe('Selection Criteria', () => {
    let app: Application;
    let kernel: Kernel;
    let schema;
    let UserModel;
    let ProfileModel;

    before(async () => {
        app = require('../../src/bootstrap/app');

        app.autoload(join(app.getBasePath(), 'app'), 'App');

        kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

        await kernel.handle();
    })

    beforeEach(async () => {
        class Profile extends BaseModel {
            public static table = 'profiles'

            @column({isPrimary: true})
            id: string;

            @column()
            public userId: number

            @hasOne(() => Profile, {foreignKey: 'userId', localKey: 'id'})
            profileNested: HasOne<typeof Profile>;
        }

        class User extends BaseModel {
            public static table = 'users'

            @column({isPrimary: true})
            id: string;

            // @column()
            // localKey: string;

            @hasOne(() => Profile, {foreignKey: 'userId', localKey: 'id'})
            profile: HasOne<typeof Profile>;
        }

        UserModel = User;
        ProfileModel = Profile;
        await setup();
    });

    afterEach( async () => {
        await cleanup()
    })

    it('should select column without error', async () => {
        const query = UserModel.query();
        const selection = new SelectionCriteria({columns: ['id'], preloads: []});
        selection.apply(query, {} as BaseRepository);
        expect(query.toSQL().sql).to.deep.eq(UserModel.query().select(['id']).toSQL().sql)
    });

    it('should preload without error', async () => {
        const query = UserModel.query();
        const selection = new SelectionCriteria({
            columns: ['id'], preloads: [{
                name: 'profile'
            }]
        });
        selection.apply(query, {} as BaseRepository);
        expect(query.toSQL().sql).to.deep.eq(UserModel.query().select(['id']).toSQL().sql);
        const profile = processRelation('profile', [{id: 1}], query);
        expect(profile.query.selectRelationKeys().toSQL().sql)
            .to.deep.eq(ProfileModel.query().whereIn('user_id', [1]).toSQL().sql);
    });

    it('should preload and select without error', async () => {
        const query = UserModel.query();
        const selection = new SelectionCriteria({
            columns: ['id'], preloads: [{
                name: 'profile',
                columns: ['id']
            }]
        });
        selection.apply(query, {} as BaseRepository);
        expect(query.toSQL().sql).to.deep.eq(UserModel.query().select(['id']).toSQL().sql);
        const profile = processRelation('profile', [{id: 1}], query);
        expect(profile.query.selectRelationKeys().toSQL().sql)
            .to.deep.eq(ProfileModel.query().select(['id', 'userId']).whereIn('user_id', [1]).toSQL().sql);
    });

    it('should preload nested', async () => {
        const query = UserModel.query();
        const selection = new SelectionCriteria({
            columns: ['id'], preloads: [{
                name: 'profile',
                columns: ['id'],
                preloads: [
                    {
                        name: 'profileNested',
                        columns: ['id']
                    }
                ]
            }]
        });
        selection.apply(query, {} as BaseRepository);
        expect(query.toSQL().sql).to.deep.eq(UserModel.query().select(['id']).toSQL().sql);
        const profile = processRelation('profile', [{id: 1}], query);
        expect(profile.query.selectRelationKeys().toSQL().sql)
            .to.deep.eq(ProfileModel.query().select(['id', 'userId']).whereIn('user_id', [1]).toSQL().sql);

        const profileNested = processRelation('profileNested', [{id: 1}], profile.query);
        expect(profileNested.query.selectRelationKeys().toSQL().sql)
            .to.deep.eq(ProfileModel.query().select(['id', 'userId']).whereIn('user_id', [1]).toSQL().sql);
    });
});

function processRelation(name, parent, query): {query: RelationQueryBuilderContract<any, any>} {
    const preloads = query.preloader.preloads;
    expect(preloads.hasOwnProperty(name)).to.be.true;

    const query1 = preloads[name].relation.eagerQuery(parent as any, query.client).sideload(query.preloader.sideloaded);

    if (typeof preloads[name].callback === "function") {
        preloads[name].callback(query1);
    }

    return {query: query1}
}