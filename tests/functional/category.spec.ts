/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 4:06 PM
 */

import {ApolloServerTestClient} from "../../src/Contracts/ApolloTestClient";
import {createTestClient} from "apollo-server-testing";
import {authContext, createServer, resetTables, seedDB} from "../helpers";
const { gql } = require('apollo-server');
import {expect} from "chai";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";
import {UserModel} from "../../src/app/UserModel";
import {CATEGORY_LIST_QUERY, CATEGORY_QUERY} from "./gql/category-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import CategoryModel from "../../src/app/Features/Category/CategoryModel";

describe('category Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
        await Factory.model('App/Features/Category/CategoryModel').createMany(10);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Category/CategoryModel').reset();
    });

    describe('category Http | Index', () => {
        beforeEach(async () => {
            authContext(null);
        });

        describe('category Http | index | base', () => {
            it('should response first category', async () => {
                const category = await CategoryModel.first();

                const res = await client.query({
                    query: CATEGORY_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
            });

            it('should response first category using order by', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
            });

            it('should response first category when authentication', async () => {
                const category = await CategoryModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: CATEGORY_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": category.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.id).to.eq(category.id);
            })
        
            it('should filter name without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": category.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.name).to.eq(category.name);
            })
        
            it('should filter description without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": category.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.description).to.eq(category.description);
            })
        
            it('should filter slug without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "slug",
                            "value": category.slug,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.slug).to.eq(category.slug);
            })
        
            it('should filter languageMaster without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "languageMaster",
                            "value": category.languageMaster,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.languageMaster).to.eq(category.languageMaster);
            })
        
            it('should filter seoTitle without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoTitle",
                            "value": category.seoTitle,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoTitle).to.eq(category.seoTitle);
            })
        
            it('should filter seoDescription without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoDescription",
                            "value": category.seoDescription,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoDescription).to.eq(category.seoDescription);
            })
        
            it('should filter seoKeyword without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoKeyword",
                            "value": category.seoKeyword,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoKeyword).to.eq(category.seoKeyword);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.id).to.eq(category.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.id).to.eq(category.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.name).to.eq(category.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.name).to.eq(category.name);
            })
        
            it('should sort by desc description without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.description).to.eq(category.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.description).to.eq(category.description);
            })
        
            it('should sort by desc parentId without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('parentId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "parentId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.parentId).to.eq(category.parentId);
            })

            it('should sort by asc parentId without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('parentId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "parentId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.parentId).to.eq(category.parentId);
            })
        
            it('should sort by desc slug without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('slug', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.slug).to.eq(category.slug);
            })

            it('should sort by asc slug without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('slug', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.slug).to.eq(category.slug);
            })
        
            it('should sort by desc categoryOrder without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('categoryOrder', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "categoryOrder": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.categoryOrder).to.eq(category.categoryOrder);
            })

            it('should sort by asc categoryOrder without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('categoryOrder', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "categoryOrder": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.categoryOrder).to.eq(category.categoryOrder);
            })
        
            it('should sort by desc language without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('language', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.language).to.eq(category.language);
            })

            it('should sort by asc language without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('language', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.language).to.eq(category.language);
            })
        
            it('should sort by desc languageMaster without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('languageMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.languageMaster).to.eq(category.languageMaster);
            })

            it('should sort by asc languageMaster without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('languageMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.languageMaster).to.eq(category.languageMaster);
            })
        
            it('should sort by desc seoTitle without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoTitle', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoTitle": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoTitle).to.eq(category.seoTitle);
            })

            it('should sort by asc seoTitle without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoTitle', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoTitle": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoTitle).to.eq(category.seoTitle);
            })
        
            it('should sort by desc seoDescription without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoDescription', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoDescription": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoDescription).to.eq(category.seoDescription);
            })

            it('should sort by asc seoDescription without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoDescription', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoDescription": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoDescription).to.eq(category.seoDescription);
            })
        
            it('should sort by desc seoKeyword without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoKeyword', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoKeyword": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoKeyword).to.eq(category.seoKeyword);
            })

            it('should sort by asc seoKeyword without error', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(3);

                const category = await CategoryModel.query().orderBy('seoKeyword', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CATEGORY_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoKeyword": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.category.id).to.eq(category.id);
                expect(res.data.category.seoKeyword).to.eq(category.seoKeyword);
            })
        
        });
    });

    describe('category Http | list', () => {
        beforeEach(async () => {
            authContext(null);
        });

        describe('category Http | list | base', () => {
            it('should reponse list category', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);
                const categorys = await CategoryModel.query();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data).to.length(categorys.length);
                expect(res.data.categories.total).to.eq(categorys.length);
                expect(res.data.categories.currentPage).to.eq(1);
            });
        });

        describe('category Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": category.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].id).to.eq(category.id)
            });
        
            it('should filter name without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": category.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].name).to.eq(category.name)
            });
        
            it('should filter description without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": category.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].description).to.eq(category.description)
            });
        
            it('should filter slug without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "slug",
                            "value": category.slug,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].slug).to.eq(category.slug)
            });
        
            it('should filter categoryOrder without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create({categoryOrder: 2});

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "categoryOrder",
                            "value": category.categoryOrder,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].categoryOrder).to.eq(category.categoryOrder)
            });

            it('should filter languageMaster without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "languageMaster",
                            "value": category.languageMaster,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].languageMaster).to.eq(category.languageMaster)
            });
        
            it('should filter seoTitle without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoTitle",
                            "value": category.seoTitle,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].seoTitle).to.eq(category.seoTitle)
            });
        
            it('should filter seoDescription without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoDescription",
                            "value": category.seoDescription,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].seoDescription).to.eq(category.seoDescription)
            });
        
            it('should filter seoKeyword without error', async () => {
                const category = await Factory.model('App/Features/Category/CategoryModel').create();

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "seoKeyword",
                            "value": category.seoKeyword,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.categories.data[0].id).to.eq(category.id)
                expect(res.data.categories.data[0].seoKeyword).to.eq(category.seoKeyword)
            });
        
        });

        describe('category Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by parentId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('parentId', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "parentId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by parentId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('parentId', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "parentId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by slug desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('slug', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by slug asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('slug', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by categoryOrder desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('categoryOrder', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "categoryOrder": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by categoryOrder asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('categoryOrder', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "categoryOrder": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by language desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('language', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('language', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by languageMaster desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('languageMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('languageMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by seoTitle desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoTitle', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoTitle": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by seoTitle asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoTitle', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoTitle": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by seoDescription desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoDescription', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoDescription": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by seoDescription asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoDescription', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoDescription": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by seoKeyword desc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoKeyword', SortEnumType.DESC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoKeyword": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by seoKeyword asc when sortBy as array', async () => {
                await Factory.model('App/Features/Category/CategoryModel').createMany(5);

                const data = await CategoryModel.query().orderBy('seoKeyword', SortEnumType.ASC)

                const res = await client.query({
                    query: CATEGORY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "seoKeyword": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.categories.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('category Http | create', () => {
        it('create category', async () => {
            authContext(await UserModel.first());

            const res = await client.mutate({
                mutation: `mutation categoryCreate(
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
                      categoryCreate(
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
                    }`,
                variables: {
                    name: 'Để xác minh cài đặt thành công, bạn thực hiện các bước sau',
                    meta: { metaKey: "assaf", metaValue: "asfsf" }
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.categoryCreate.slug).to.be.eq('de-xac-minh-cai-dat-thanh-cong-ban-thuc-hien-cac-buoc-sau');
            expect(res.data.categoryCreate.languageMaster).to.be.eq(res.data.categoryCreate.id);
            expect(res.data.categoryCreate.parentId).to.be.eq('0');
            expect(res.data.categoryCreate.meta).to.be.length(1);

        });
    });

    describe('category Http | update', () => {
        it('update category', async () => {
            authContext(await UserModel.first());
            const category = await Factory.model('App/Features/Category/CategoryModel').create();

            const res = await client.mutate({
                mutation: `mutation categoryUpdate(
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
                  data: categoryUpdate(
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
                    meta: { metaKey: "assaf", metaValue: "asfsf" }
                }
            });
            expect(res.errors).to.be.undefined;
            expect(res.data.data.slug).to.be.eq('de-xac-minh-cai-dat-thanh-cong-ban-thuc-hien-cac-buoc-sau');
            expect(res.data.data.languageMaster).to.be.eq(res.data.data.id);
            expect(res.data.data.parentId).to.be.eq('0');
            expect(res.data.data.meta).to.be.length(1);
        });
    });

    describe('category Http | delete', () => {
        it('delete category', async () => {
            authContext(await UserModel.first());
            const category = await Factory.model('App/Features/Category/CategoryModel').create();

            const res = await client.mutate({
                mutation: `mutation categoryDelete($id: [ID_CRYPTO]) {
                  categoryDelete(id: $id) {
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