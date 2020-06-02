/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 6:34 PM
 */

import '../support';
import {expect} from 'chai';
import {
    buildSchema,
    createUnionType,
    Field,
    ID,
    Info,
    InterfaceType,
    ObjectType,
    Query,
    Resolver
} from "@tngraphql/graphql";
import {Router} from "@tngraphql/route";
import {DefaultContainer} from "@tngraphql/graphql/dist/utils/container";
import {getField, getFieldSelection, SelectFields} from "../../src/decorators/SelectFields";
import {graphql} from "graphql";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {HasOne} from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';

describe('Select Fields', () => {
    let info;
    let fields;
    let schema;

    before(async () => {
        class User extends BaseModel {
            public static table = 'users'

            @column({isPrimary: true})
            id: string;

            @column()
            name: string;
        }

        @ObjectType()
        class SampleNestedObject {
            @Field()
            id: string;

            @Field()
            name: string;

            @Field()
            nested: SampleNestedObject;
        }

        @ObjectType()
        class SampleObject {
            static model = User;

            @Field(type => ID)
            id: string;

            @Field()
            name: string;

            @Field()
            profile: SampleNestedObject;
        }

        @Resolver(of => SampleObject)
        class SampleResolver {
            @Query()
            sampleQuery(@Info() data, @SelectFields() fieldInfo): SampleObject {
                info = data;
                fields = fieldInfo;
                return {} as SampleObject;
            }

            @Query(returns => [SampleObject])
            sampleArrayQuery(@Info() data, @SelectFields() fieldInfo): [SampleObject] {
                info = data;
                fields = fieldInfo;
                return [{}] as [SampleObject];
            }

            @Query()
            stringQuery(@Info() data): string {
                info = data;
                return '';
            }
        }

        const router = new Router();
        const container = new DefaultContainer();
        container.bind('SampleResolver', SampleResolver);
        router.query('sampleQuery', 'SampleResolver.sampleQuery');
        router.query('sampleArrayQuery', 'SampleResolver.sampleArrayQuery');
        router.query('stringQuery', 'SampleResolver.stringQuery');

        schema = await buildSchema({
            router,
            container
        });
    });

    describe('Select Fields | Unit', () => {
        it('should getFieldSelection without error', async () => {
            const result = await graphql(schema, `{sampleQuery{id}}`);

            expect(getFieldSelection(info)).to.deep.eq({id: true});
        });
    });

    describe('Select Fields | Get Field', () => {
        let UserModel;
        let ProfileModel;

        beforeEach(async () => {
            class Profile extends BaseModel {
                public static table = 'profiles'

                @column({isPrimary: true})
                id: string;

                @column()
                public userId: number
            }

            class User extends BaseModel {
                public static table = 'users'

                @column({isPrimary: true})
                id: string;

                @column()
                localKey: string;

                @hasOne(() => Profile, {foreignKey: 'userId', localKey: 'localKey'})
                profile: HasOne<typeof Profile>;
            }

            UserModel = User;
            ProfileModel = Profile;
        });

        it('should getField without error', async () => {
            expect(getField({id: true, name: true}, UserModel)).to.deep.eq({columns: ['id'], preloads: []})
            expect(getField({id: true, name: true}, undefined)).to.deep.eq({columns: ['id', 'name'], preloads: []})
        });

        it('should get primary key', async () => {
            expect(getField({name: true}, UserModel)).to.deep.eq({columns: ['id'], preloads: []})
        });

        it('should get relation', async () => {
            expect(getField({name: true, profile: true}, UserModel)).to.deep.eq({
                columns: ['id', 'localKey'], preloads: [
                    {
                        name: "profile"
                    }
                ]
            })
        });

        it('should get local key', async () => {
            expect(getField({name: true, profile: true}, UserModel)).to.deep.eq({
                columns: ['id', 'localKey'], preloads: [
                    {
                        name: "profile",
                    }
                ]
            })
        });

        it('should get relation nested', async () => {
            expect(getField({name: true, profile: {id: true}}, UserModel)).to.deep.eq({
                columns: ['id', 'localKey'],
                preloads: [
                    {
                        name: "profile",
                        columns: ['id'],
                        preloads: []
                    }
                ]
            })
        });
    });

    describe('Select Fields | Decorator Select Fields', () => {
        it('should getField without error', async () => {
            const result = await graphql(schema, `{sampleQuery{id}}`);
            expect(fields).to.deep.eq({columns: ['id'], preloads: []});
        });

        it('should getField without error, return array type', async () => {
            const result = await graphql(schema, `{sampleArrayQuery{id}}`);
            expect(fields).to.deep.eq({columns: ['id'], preloads: []});
        });
    });
});