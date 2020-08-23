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
import {PAGE_LIST_QUERY, PAGE_QUERY} from "./gql/page-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {PageModel} from "../../src/app/Features/Post/PageModel";
import {PostStatusEnumType} from "../../src/app/Features/Post/Types/Post/PostStatusEnumType";
import {PostCommentStatusEnumType} from "../../src/app/Features/Post/Types/Post/PostCommentStatusEnumType";
import {DateTime} from "luxon";

describe('page Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
        await Factory.model('App/Features/Post/PageModel').createMany(5);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Post/PageModel').reset();
        await Factory.get('post_category').reset();
    });

    describe('page Http | Index', () => {
        describe('page Http | index | base', () => {
            it('should response first page', async () => {
                const page = await PageModel.first();

                const res = await client.query({
                    query: PAGE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
            });

            it('should response first page using order by', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
            });

            it('should response first page when authentication', async () => {
                const page = await PageModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: PAGE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": page.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.id).to.eq(page.id);
            })
        
            it('should filter name without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": page.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.name).to.eq(page.name);
            })
        
            it('should filter authorId without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({authorId: "2"});

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "authorId",
                            "value": page.authorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.authorId).to.eq(page.authorId);
            })
        
            it('should filter parentId without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({parentId: "2"});

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "parentId",
                            "value": page.parentId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.parentId).to.eq(page.parentId);
            })
        
            it('should filter postStatus without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({postStatus: PostStatusEnumType.draft});

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "postStatus",
                            "value": page.postStatus,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.postStatus).to.eq(page.postStatus);
            })
        
            it('should filter commentStatus without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({commentStatus: PostCommentStatusEnumType.closed});

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentStatus",
                            "value": page.commentStatus,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentStatus).to.eq(page.commentStatus);
            })
        
            it('should filter commentCount without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();
                page.commentCount = 1;
                await page.save();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentCount",
                            "value": page.commentCount,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentCount).to.eq(page.commentCount);
            })
        
            it('should filter description without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": page.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.description).to.eq(page.description);
            })
        
            it('should filter content without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "content",
                            "value": page.content,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.content).to.eq(page.content);
            })
        
            it('should filter publishedAt without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "filter": {
                            "field": "publishedAt",
                            "value": page.publishedAt,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.publishedAt).to.deep.eq(page.publishedAt);
            })
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.id).to.eq(page.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.id).to.eq(page.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.name).to.eq(page.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.name).to.eq(page.name);
            })
        
            it('should sort by desc authorId without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('authorId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.authorId).to.eq(page.authorId);
            })

            it('should sort by asc authorId without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('authorId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.authorId).to.eq(page.authorId);
            })
        
            it('should sort by desc postStatus without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('postStatus', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "postStatus": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.postStatus).to.eq(page.postStatus);
            })

            it('should sort by asc postStatus without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('postStatus', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "postStatus": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.postStatus).to.eq(page.postStatus);
            })
        
            it('should sort by desc commentStatus without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('commentStatus', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentStatus).to.eq(page.commentStatus);
            })

            it('should sort by asc commentStatus without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('commentStatus', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentStatus).to.eq(page.commentStatus);
            })
        
            it('should sort by desc commentCount without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('commentCount', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentCount).to.eq(page.commentCount);
            })

            it('should sort by asc commentCount without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('commentCount', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.commentCount).to.eq(page.commentCount);
            })
        
            it('should sort by desc description without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.description).to.eq(page.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.description).to.eq(page.description);
            })
        
            it('should sort by desc content without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('content', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.content).to.eq(page.content);
            })

            it('should sort by asc content without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('content', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.content).to.eq(page.content);
            })
        
            it('should sort by desc language without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('language', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.language).to.eq(page.language);
            })

            it('should sort by asc language without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('language', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.language).to.eq(page.language);
            })
        
            it('should sort by desc languageMaster without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('languageMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.languageMaster).to.eq(page.languageMaster);
            })

            it('should sort by asc languageMaster without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('languageMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.languageMaster).to.eq(page.languageMaster);
            })
        
            it('should sort by desc publishedAt without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('publishedAt', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.publishedAt).to.deep.eq(page.publishedAt);
            })

            it('should sort by asc publishedAt without error', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(3);

                const page = await PageModel.query().orderBy('publishedAt', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PAGE_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.page.id).to.eq(page.id);
                expect(res.data.page.publishedAt).to.deep.eq(page.publishedAt);
            })
        });
    });

    describe('page Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('page Http | list | base', () => {
            it('should reponse list page', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);
                const pages = await PageModel.query();

                const res = await client.query({
                    query: PAGE_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data).to.length(pages.length);
                expect(res.data.pages.total).to.eq(pages.length);
                expect(res.data.pages.currentPage).to.eq(1);
            });

            it('should response page paginate', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);
                const pages = await PageModel.query();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data).to.length(2)
                expect(res.data.pages.perPage).to.eq(2)
                expect(res.data.pages.total).to.eq(pages.length)
                expect(res.data.pages.currentPage).to.eq(2)
            });
        });

        describe('page Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": page.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].id).to.eq(page.id)
            });
        
            it('should filter name without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": page.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].name).to.eq(page.name)
            });
        
            it('should filter authorId without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({authorId: '2'});

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "authorId",
                            "value": page.authorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].authorId).to.eq(page.authorId)
            });
        
            it('should filter parentId without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({parentId: '1'});

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "parentId",
                            "value": page.parentId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].parentId).to.eq(page.parentId)
            });
        
            it('should filter postStatus without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({postStatus: PostStatusEnumType.draft});

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "postStatus",
                            "value": page.postStatus,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].postStatus).to.eq(page.postStatus)
            });
        
            it('should filter commentStatus without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({commentStatus: PostCommentStatusEnumType.closed});

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentStatus",
                            "value": page.commentStatus,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].commentStatus).to.eq(page.commentStatus)
            });
        
            it('should filter commentCount without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();
                page.commentCount = 1;
                await page.save();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentCount",
                            "value": page.commentCount,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].commentCount).to.eq(page.commentCount)
            });
        
            it('should filter description without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": page.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].description).to.eq(page.description)
            });
        
            it('should filter content without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create();

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "content",
                            "value": page.content,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].content).to.eq(page.content)
            });
        
            it('should filter publishedAt without error', async () => {
                const page = await Factory.model('App/Features/Post/PageModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "publishedAt",
                            "value": page.publishedAt,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.pages.data[0].id).to.eq(page.id)
                expect(res.data.pages.data[0].publishedAt).to.deep.eq(page.publishedAt)
            });
        });

        describe('page Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by authorId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('authorId', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by authorId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('authorId', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by postStatus desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('postStatus', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "postStatus": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by postStatus asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('postStatus', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "postStatus": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by commentStatus desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('commentStatus', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentStatus asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('commentStatus', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by commentCount desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('commentCount', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentCount asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('commentCount', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by content desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('content', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by content asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('content', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by language desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('language', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('language', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by languageMaster desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('languageMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('languageMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by publishedAt desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('publishedAt', SortEnumType.DESC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by publishedAt asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PageModel').createMany(5);

                const data = await PageModel.query().orderBy('publishedAt', SortEnumType.ASC)

                const res = await client.query({
                    query: PAGE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.pages.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        });
    });

    describe('page Http | create', () => {
        describe('page Http | create', () => {
            it('page category', async () => {
                const user = await UserModel.create({name: 'job'});
                authContext(user);
                const category = [
                    await Factory.model('App/Features/Category/CategoryModel').create(),
                    await Factory.model('App/Features/Category/CategoryModel').create()
                ];


                const res = await client.mutate({
                    mutation: `mutation pageCreate(
                      $name: String
                      $commentStatus: PostCommentStatus = open
                      $slug: String
                      $parentId: String = "0"
                      $description: String
                      $content: String
                      $tags: [String]
                      $categories: [ID_CRYPTO]
                      $seoTitle: String
                      $seoDescription: String
                      $seoKeyword: String
                      $meta: [MetaInput]
                    ) {
                      pageCreate(
                        name: $name
                        commentStatus: $commentStatus
                        slug: $slug
                        parentId: $parentId
                        description: $description
                        content: $content
                        tags: $tags
                        categories: $categories
                        seoTitle: $seoTitle
                        seoDescription: $seoDescription
                        seoKeyword: $seoKeyword
                        meta: $meta
                      ) {
                        id
                        authorId
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
                        "name": "asfsaf",
                        "content": "ajsnjsaf",
                        "meta": [
                            {
                                "metaKey": "afasgas",
                                "metaValue": "asjfask"
                            }
                        ]
                    }
                });

                expect(res.errors).to.be.undefined;
                expect(res.data.pageCreate.authorId).to.be.eq(user.id);
            });
        })
    });

    describe('page Http | update', () => {
        it('update page', async () => {
            authContext(await UserModel.first());
            const page = await Factory.model('App/Features/Post/PageModel').create();
            const category = [
                await Factory.model('App/Features/Category/CategoryModel').create(),
                await Factory.model('App/Features/Category/CategoryModel').create()
            ];

            const res = await client.mutate({
                mutation: `mutation pageUpdate(
                  $id: ID_CRYPTO
                  $name: String
                  $avatar: String
                  $thumbnailId: String
                  $commentStatus: PostCommentStatus
                  $slug: String
                  $description: String
                  $content: String
                  $tags: [String]
                  $categories: [ID_CRYPTO]
                  $seoTitle: String
                  $seoDescription: String
                  $seoKeyword: String
                  $meta: [MetaInput]
                ) {
                  data: pageUpdate(
                    id: $id
                    name: $name
                    avatar: $avatar
                    thumbnailId: $thumbnailId
                    commentStatus: $commentStatus
                    slug: $slug
                    description: $description
                    content: $content
                    tags: $tags
                    categories: $categories
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
                    authorId
                    meta {
                      id
                      metaKey
                      metaValue
                    }
                  }
                }
                `,
                variables: {
                    id: page.id,
                    "name": "asfsaf",
                    "content": "ajsnjsaf",
                    "meta": [
                        {
                            "metaKey": "afasgas",
                            "metaValue": "asjfask"
                        }
                    ]
                }
            });
            expect(res.errors).to.be.undefined;
        });
    });

    describe('page Http | delete', () => {
        it('delete page', async () => {
            authContext(await UserModel.first());
            const page = await Factory.model('App/Features/Post/PageModel').create();

            const res = await client.mutate({
                mutation: `mutation pageDelete($id: [ID_CRYPTO]) {
                  pageDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: page.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });
});