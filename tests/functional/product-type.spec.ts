/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 4:06 PM
 */

import { ApolloServerTestClient } from '../../src/Contracts/ApolloTestClient';
import { createTestClient } from 'apollo-server-testing';
import { authContext, createServer, resetTables, seedDB } from '../helpers';

const { gql } = require('apollo-server');
import { expect } from 'chai';
import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import { UserModel } from '../../src/app/UserModel';
import { PRODUCTTYPE_LIST_QUERY, PRODUCTTYPE_QUERY } from './gql/product-type-gql';
import { SortEnumType } from '../../src/app/GraphQL/Types/SortEnumType';
import { ProductTypeModel } from '../../src/app/Features/Product/Models/ProductTypeModel';

describe('productType Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
        await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(10);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Product/Models/ProductTypeModel').reset();
    });

    describe('productType Http | Index', () => {
        describe('productType Http | index | base', () => {
            it('should response first productType', async () => {
                const productType = await ProductTypeModel.first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
            });

            it('should response first productType using order by', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': {
                            'id': 'DESC'
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
            });

            it('should response first productType when authentication', async () => {
                const productType = await ProductTypeModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
            });
        });

        describe('User Http | index | filter', () => {

            it('should filter id without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': productType.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.id).to.eq(productType.id);
            })

            it('should filter name without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'name',
                            'value': productType.name,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.name).to.eq(productType.name);
            })

            it('should filter description without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'description',
                            'value': productType.description,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.description).to.eq(productType.description);
            })

            it('should filter parentId without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    parentId: '2'
                });

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'parentId',
                            'value': productType.parentId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.parentId).to.eq(productType.parentId);
            })

            it('should filter slug without error', async () => {
                const productType = await ProductTypeModel.first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'slug',
                            'value': productType.slug,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.slug).to.eq(productType.slug);
            })

            it('should filter categoryOrder without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    categoryOrder: 10
                });

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'categoryOrder',
                            'value': productType.categoryOrder,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.categoryOrder).to.eq(productType.categoryOrder);
            })

            it('should filter language without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    language: '2'
                });

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'language',
                            'value': productType.language,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.language).to.eq(productType.language);
            })

            it('should filter languageMaster without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'languageMaster',
                            'value': productType.languageMaster,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.languageMaster).to.eq(productType.languageMaster);
            })

            it('should filter seoTitle without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoTitle',
                            'value': productType.seoTitle,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.seoTitle).to.eq(productType.seoTitle);
            })

            it('should filter seoDescription without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoDescription',
                            'value': productType.seoDescription,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.seoDescription).to.eq(productType.seoDescription);
            })

            it('should filter seoKeyword without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoKeyword',
                            'value': productType.seoKeyword,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.seoKeyword).to.eq(productType.seoKeyword);
            })

        });

        describe('User Http | index | sortBy', () => {

            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.id).to.eq(productType.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.id).to.eq(productType.id);
            })

            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.name).to.eq(productType.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.name).to.eq(productType.name);
            })

            it('should sort by desc description without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.description).to.eq(productType.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.description).to.eq(productType.description);
            })

            it('should sort by desc parentId without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('parentId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'parentId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.parentId).to.eq(productType.parentId);
            })

            it('should sort by asc parentId without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('parentId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'parentId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.parentId).to.eq(productType.parentId);
            })

            it('should sort by desc slug without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('slug', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'slug': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.slug).to.eq(productType.slug);
            })

            it('should sort by asc slug without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('slug', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'slug': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.slug).to.eq(productType.slug);
            })

            it('should sort by desc categoryOrder without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('categoryOrder', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'categoryOrder': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.categoryOrder).to.eq(productType.categoryOrder);
            })

            it('should sort by asc categoryOrder without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('categoryOrder', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'categoryOrder': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.categoryOrder).to.eq(productType.categoryOrder);
            })

            it('should sort by desc language without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('language', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.language).to.eq(productType.language);
            })

            it('should sort by asc language without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('language', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.language).to.eq(productType.language);
            })

            it('should sort by desc languageMaster without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('languageMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.languageMaster).to.eq(productType.languageMaster);
            })

            it('should sort by asc languageMaster without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(3);

                const productType = await ProductTypeModel.query().orderBy('languageMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTTYPE_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productType.id).to.eq(productType.id);
                expect(res.data.productType.languageMaster).to.eq(productType.languageMaster);
            })
        });
    });

    describe('productType Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('productType Http | list | base', () => {
            it('should reponse list productType', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);
                const productTypes = await ProductTypeModel.query();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data).to.length(productTypes.length);
                expect(res.data.productTypes.total).to.eq(productTypes.length);
                expect(res.data.productTypes.currentPage).to.eq(1);
            });

            it('should response productType paginate', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);
                const productTypes = await ProductTypeModel.query();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data).to.length(0)
                expect(res.data.productTypes.perPage).to.eq(1000)
                expect(res.data.productTypes.currentPage).to.eq(2)
            });
        });

        describe('productType Http | list | filter', () => {

            it('should filter id without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': productType.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
            });

            it('should filter name without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'name',
                            'value': productType.name,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].name).to.eq(productType.name)
            });

            it('should filter description without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'description',
                            'value': productType.description,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].description).to.eq(productType.description)
            });

            it('should filter parentId without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    parentId: '2'
                });

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'parentId',
                            'value': productType.parentId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].parentId).to.eq(productType.parentId)
            });

            it('should filter slug without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'slug',
                            'value': productType.slug,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].slug).to.eq(productType.slug)
            });

            it('should filter categoryOrder without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    categoryOrder: 10
                });

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'categoryOrder',
                            'value': productType.categoryOrder,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].categoryOrder).to.eq(productType.categoryOrder)
            });

            it('should filter language without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create({
                    language: '2'
                });

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'language',
                            'value': productType.language,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].language).to.eq(productType.language)
            });

            it('should filter languageMaster without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'languageMaster',
                            'value': productType.languageMaster,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].languageMaster).to.eq(productType.languageMaster)
            });

            it('should filter seoTitle without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoTitle',
                            'value': productType.seoTitle,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].seoTitle).to.eq(productType.seoTitle)
            });

            it('should filter seoDescription without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoDescription',
                            'value': productType.seoDescription,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].seoDescription).to.eq(productType.seoDescription)
            });

            it('should filter seoKeyword without error', async () => {
                const productType = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'seoKeyword',
                            'value': productType.seoKeyword,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data[0].id).to.eq(productType.id)
                expect(res.data.productTypes.data[0].seoKeyword).to.eq(productType.seoKeyword)
            });

        });

        describe('productType Http | list | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by parentId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('parentId', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'parentId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by parentId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('parentId', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'parentId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by slug desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('slug', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'slug': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by slug asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('slug', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'slug': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by categoryOrder desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('categoryOrder', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'categoryOrder': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by categoryOrder asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('categoryOrder', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'categoryOrder': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('language', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('language', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('languageMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductTypeModel').createMany(5);

                const data = await ProductTypeModel.query().orderBy('languageMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTTYPE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productTypes.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });
        });
    });

    describe('productType Http | create', () => {
        it('create productType', async () => {
            authContext(await UserModel.first());

            const res = await client.mutate({
                mutation: `mutation productTypeCreate(
                      $name: String
                      $slug: String
                      $description: String
                      $parentId: ID_CRYPTO
                      $categoryOrder: Int
                      $seoTitle: String
                      $seoDescription: String
                      $seoKeyword: String
                      $meta: [MetaInput]
                    ) {
                      data: productTypeCreate(
                        name: $name
                        slug: $slug
                        description: $description
                        parentId: $parentId
                        categoryOrder: $categoryOrder
                        seoTitle: $seoTitle
                        seoDescription: $seoDescription
                        seoKeyword: $seoKeyword
                        meta: $meta
                      ) {
                        id
                        name
                        slug
                        language
                        languageMaster
                        parentId
                        meta {
                          id
                          metaKey
                          metaValue
                        }
                      }
                    }
                    `,
                variables: {
                    name: 'Để xác minh cài đặt thành công, bạn thực hiện các bước sau',
                    meta: { metaKey: 'assaf', metaValue: 'asfsf' }
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.data.slug).to.be.eq('de-xac-minh-cai-dat-thanh-cong-ban-thuc-hien-cac-buoc-sau');
            expect(res.data.data.languageMaster).to.be.eq(res.data.data.id);
            expect(res.data.data.parentId).to.be.eq('0');
            expect(res.data.data.meta).to.be.length(1);

        });
    });

    describe('productType Http | update', () => {
        it('update productType', async () => {
            authContext(await UserModel.first());
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const res = await client.mutate({
                mutation: `mutation productTypeUpdate(
                  $id: ID_CRYPTO
                  $name: String
                  $slug: String
                  $description: String
                  $parentId: ID_CRYPTO
                  $categoryOrder: Int
                  $seoTitle: String
                  $seoDescription: String
                  $seoKeyword: String
                  $meta: [MetaInput]
                ) {
                  data: productTypeUpdate(
                    id: $id
                    name: $name
                    slug: $slug
                    description: $description
                    parentId: $parentId
                    categoryOrder: $categoryOrder
                    seoTitle: $seoTitle
                    seoDescription: $seoDescription
                    seoKeyword: $seoKeyword
                    meta: $meta
                  ) {
                    id
                    name
                    slug
                    language
                    languageMaster
                    parentId
                    meta{
                      id
                      metaKey
                      metaValue
                    }
                  }
                }
                `,
                variables: {
                    id: category.id,
                    name: 'Để xác minh cài đặt thành công, bạn thực hiện các bước sau',
                    slug: 'de-xac-minh-cai-dat-thanh-cong-ban-thuc-hien-cac-buoc-sau',
                    meta: { metaKey: 'assaf', metaValue: 'asfsf' }
                }
            });
            expect(res.errors).to.be.undefined;
            expect(res.data.data.slug).to.be.eq('de-xac-minh-cai-dat-thanh-cong-ban-thuc-hien-cac-buoc-sau');
            expect(res.data.data.languageMaster).to.be.eq(res.data.data.id);
            expect(res.data.data.parentId).to.be.eq('0');
            expect(res.data.data.meta).to.be.length(1);
        });
    });

    describe('productType Http | delete', () => {
        it('delete productType', async () => {
            authContext(await UserModel.first());
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const res = await client.mutate({
                mutation: `mutation productTypeDelete($id: [ID_CRYPTO]) {
                  productTypeDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: category.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });
});