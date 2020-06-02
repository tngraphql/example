/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 11:14 AM
 */
require('../support');

import {expect} from 'chai';
import {FilterCriteria} from "../../src/Repositories/Criteria/FilterCriteria";
import {Application} from "@tngraphql/illuminate";
import {Kernel} from "../../src/app/GraphQL/Kernel";
import {join} from "path";
import {FilterContract} from "../../src/Contracts/FilterContract";
import {OperatorEnumType} from "../../src/app/GraphQL/Types/OperatorEnumType";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";

describe('Filter Apply', () => {
    let app: Application;
    let kernel: Kernel;
    let schema;
    let server;
    let UserModel: LucidModel;
    let ProfileModel;

    beforeEach(async () => {
        app = require('../../src/bootstrap/app');

        app.autoload(join(app.getBasePath(), 'app'), 'App');

        kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

        await kernel.handle();

        class Profile extends BaseModel {
            @column()
            public id: string;
        }

        class UserModelClass extends BaseModel {
            public static table = 'users'

            @column()
            public id: string;

            @column()
            public name: string;

            @hasOne(() => Profile)
            public profile: HasOne<typeof Profile>
        }

        UserModel = UserModelClass;
        ProfileModel = Profile;
    });

    it('should apply without error', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: '1',
            field: 'id'
        }

        const filter = new FilterCriteria(filters);
        filter.apply(repo, {} as any);
        const sql = repo.toSQL().sql
        expect(repo.toSQL().sql).to.deep.equal(UserModel.query().where(filters.field, filters.operator, filters.value).toSQL().sql)
    });

    it('sample', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: '1',
            field: 'id'
        }

        FilterCriteria.filter(repo, undefined)
        expect(repo.toSQL().sql).to.deep.eq(UserModel.query().toSQL().sql);

        FilterCriteria.filter(repo, {} as any)
        expect(repo.toSQL().sql).to.deep.eq(UserModel.query().toSQL().sql);

        expect(FilterCriteria.is_where(null)).to.be.false;

        FilterCriteria.filter(repo, filters)
        const sql = repo.toSQL().sql
        expect(repo.toSQL().sql).to.deep.equal(UserModel.query().where(filters.field, filters.operator, filters.value).toSQL().sql)
    });

    it('value is null', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: null,
            field: 'id'
        }

        FilterCriteria.filter(repo, filters)
        const sql = repo.toSQL().sql
        expect(repo.toSQL().sql).to.deep.equal(UserModel.query().where(filters.field, filters.operator, filters.value).toSQL().sql)
    });

    it('where in', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.in,
            value: ['1', '2'],
            field: 'id'
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where(filters.field, filters.operator, filters.value).toSQL();

        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('where notIn', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.notIn,
            value: ['1', '2'],
            field: 'id'
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where(filters.field, filters.operator, filters.value).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('where like', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.like,
            value: '%nguyen',
            field: 'name'
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where(filters.field, filters.operator, filters.value).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('where contains', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.contains,
            value: 'nguyen',
            field: 'name'
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where(filters.field, 'like', filters.value).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('field is callback return string', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: 'nguyen',
            field: (value, operation) => {
                return `name ${operation} ${value}`;
            }
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().whereRaw(`name = nguyen`).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('field is callback return function', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: 'nguyen',
            field: (value, operation) => {
                return query => {
                    query.where('id', operation, value);
                }
            }
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where(query => query.where('id', filters.operator, filters.value)).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('field is callback return object', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.eq,
            value: 'nguyen',
            field: (value, operation) => {
                return {
                    field: 'id',
                    value: '1'
                }
            }
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().where('id', filters.operator, '1').toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('where between', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.between,
            value: ['3', '4'],
            field: 'id'
        }

        FilterCriteria.filter(repo, filters);
        const sql = repo.toSQL();
        const rsql = UserModel.query().whereBetween(filters.field, filters.value).toSQL();
        expect(sql.sql).to.deep.equal(rsql.sql);
        expect(sql.bindings).to.deep.equal(rsql.bindings);
    });

    it('items or where', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.OR,
            items: [
                {
                    operator: OperatorEnumType.eq,
                    value: '1',
                    field: 'id',
                },
                {
                    operator: OperatorEnumType.eq,
                    value: '2',
                    field: 'name',
                }
            ]
        }
        FilterCriteria.filter(repo, filters);
        expect(repo.toSQL().sql)
            .to.be.equal(UserModel.query().where(query => {
            query.orWhere('id', 1).orWhere('name', 2)
        }).toSQL().sql)
    });

    it('items and where', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.AND,
            items: [
                {
                    operator: OperatorEnumType.eq,
                    value: '1',
                    field: 'id',
                },
                {
                    operator: OperatorEnumType.eq,
                    value: '2',
                    field: 'name',
                }
            ]
        }
        FilterCriteria.filter(repo, filters);
        expect(repo.toSQL().sql)
            .to.be.equal(UserModel.query().where(query => {
            query.where('id', 1).where('name', 2)
        }).toSQL().sql)
    });

    it('nested items', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.OR,
            items: [
                {
                    operator: OperatorEnumType.eq,
                    value: '2',
                    field: 'id',
                },
                {
                    operator: OperatorEnumType.AND,
                    items: [
                        {
                            operator: OperatorEnumType.eq,
                            value: '2',
                            field: 'name',
                        },
                        {
                            operator: OperatorEnumType.eq,
                            value: '2',
                            field: 'name',
                        }
                    ]
                },

            ]
        }
        FilterCriteria.filter(repo, filters);
        const fsql = repo.toSQL().sql;
        const rsql = UserModel.query().where(query => {
            query.orWhere('id', 2)
                .orWhere(query => {
                    query.where('name', 2)
                        .where('name', 2)
                })
        }).toSQL().sql;

        expect(fsql).to.be.equal(rsql);
    });

    it('groups or where', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.OR,
            groups: [
                {
                    operator: OperatorEnumType.AND,
                    items: [
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        },
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        }
                    ]
                },
                {
                    operator: OperatorEnumType.AND,
                    items: [
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        },
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        }
                    ]
                }
            ]
        }

        FilterCriteria.filter(repo, filters);
        const fsql = repo.toSQL().sql;
        const rsql = UserModel.query().where(query => {
            query.orWhere(query => {
                query.where('id', 1).where('id', 1)
            }).orWhere(query => {
                query.where('id', 1).where('id', 1)
            })
        }).toSQL().sql;

        expect(fsql).to.be.equal(rsql);
    });

    it('groups and where', async () => {
        const repo = UserModel.query();
        const filters: FilterContract = {
            operator: OperatorEnumType.and,
            groups: [
                {
                    operator: OperatorEnumType.AND,
                    items: [
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        },
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        }
                    ]
                },
                {
                    operator: OperatorEnumType.AND,
                    items: [
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        },
                        {
                            operator: OperatorEnumType.eq,
                            value: '1',
                            field: 'id',
                        }
                    ]
                }
            ]
        }

        FilterCriteria.filter(repo, filters);
        const fsql = repo.toSQL().sql;
        const rsql = UserModel.query().where(query => {
            query.where(query => {
                query.where('id', 1).where('id', 1)
            }).where(query => {
                query.where('id', 1).where('id', 1)
            })
        }).toSQL().sql;

        expect(fsql).to.be.equal(rsql);
    });
});