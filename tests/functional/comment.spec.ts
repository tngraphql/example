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
import {COMMENT_LIST_QUERY, COMMENT_POST_CREATE_GQL, COMMENT_QUERY} from "./gql/comment-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import CommentModel from "../../src/app/Features/Comment/CommentModel";
import {CommentStatusEnumType} from "../../src/app/Features/Comment/Types/CommentStatusEnumType";
import {DateTime} from "luxon";
import {CommentableEnumType} from "../../src/app/Features/Comment/Types/CommentableEnumType";

describe('comment Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(await UserModel.first());
        await Factory.model('App/Features/Comment/CommentModel').createMany(10);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Comment/CommentModel').reset();
    });

    describe('comment Http | Index', () => {
        describe('comment Http | index | base', () => {
            it('should response first comment', async () => {
                const comment = await CommentModel.first();
                const res = await client.query({
                    query: COMMENT_QUERY
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
            });

            it('should response first comment using order by', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
            });

            it('should response first comment when authentication', async () => {
                const comment = await CommentModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: COMMENT_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
            });

            it('should response author comment', async () => {
                const author = await UserModel.first();
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({
                    authorId: author.id
                });

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": comment.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.author.id).to.eq(author.id);
                expect(res.data.comment.author.name).to.eq(author.name);
            });

            it('should response post comment', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({
                    commentableId: post.id,
                    commentableType: 'post'
                });

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": comment.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.responseTo.id).to.eq(post.id);
                expect(res.data.comment.responseTo.name).to.eq(post.name);
            });

            it('should response total reply comment', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({
                    commentableId: post.id,
                    commentableType: 'post'
                });
                await Factory.model('App/Features/Comment/CommentModel').createMany(5,{
                    commentableId: post.id,
                    commentableType: 'post',
                    parentId: comment.id
                });

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": comment.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.totalReply).to.eq(5);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": comment.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.id).to.eq(comment.id);
            })
        
            it('should filter authorId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({authorId: '2'});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "authorId",
                            "value": comment.authorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.authorId).to.eq(comment.authorId);
            })
        
            it('should filter parentId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({parentId: '2'});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "parentId",
                            "value": comment.parentId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.parentId).to.eq(comment.parentId);
            })
        
            it('should filter body without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({body: 'nikk'});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "body",
                            "value": comment.body,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.body).to.eq(comment.body);
            })
        
            it('should filter status without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({status: CommentStatusEnumType.trash});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": comment.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.status).to.eq(comment.status);
            })
        
            it('should filter commentableType without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({commentableType: 'product'});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentableType",
                            "value": comment.commentableType,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.commentableType).to.eq(comment.commentableType);
            })
        
            it('should filter commentableId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({commentableId: '2'});

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentableId",
                            "value": comment.commentableId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.commentableId).to.eq(comment.commentableId);
            })
        
            it('should filter publishedAt without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "filter": {
                            "field": "publishedAt",
                            "value": '2020-06-16 11:25:42',
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.publishedAt).to.deep.eq(comment.publishedAt);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.id).to.eq(comment.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.id).to.eq(comment.id);
            })
        
            it('should sort by desc authorId without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('authorId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.authorId).to.eq(comment.authorId);
            })

            it('should sort by asc authorId without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('authorId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.authorId).to.eq(comment.authorId);
            })
        
            it('should sort by desc body without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('body', SortEnumType.DESC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "body": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.body).to.eq(comment.body);
            })

            it('should sort by asc body without error', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(3);

                const comment = await CommentModel.query().orderBy('body', SortEnumType.ASC).first();

                const res = await client.query({
                    query: COMMENT_QUERY,
                    variables: {
                        "sortBy": [{
                            "body": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comment.id).to.eq(comment.id);
                expect(res.data.comment.body).to.eq(comment.body);
            })
        });
    });

    describe('comment Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('comment Http | list | base', () => {
            it('should reponse list comment', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);
                const comments = await CommentModel.query();

                const res = await client.query({
                    query: COMMENT_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data).to.length(comments.length);
                expect(res.data.comments.total).to.eq(comments.length);
                expect(res.data.comments.currentPage).to.eq(1);
            });

            it('should response comment paginate', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);
                const comments = await CommentModel.query();

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data).to.length(2)
                expect(res.data.comments.perPage).to.eq(2)
                expect(res.data.comments.total).to.eq(comments.length)
                expect(res.data.comments.currentPage).to.eq(2)
            });
        });

        describe('comment Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create();

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": comment.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].id).to.eq(comment.id)
            });
        
            it('should filter authorId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({authorId: '2'});

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "authorId",
                            "value": comment.authorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].authorId).to.eq(comment.authorId)
            });
        
            it('should filter parentId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({parentId: '2'});

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "parentId",
                            "value": comment.parentId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].parentId).to.eq(comment.parentId)
            });
        
            it('should filter body without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create();

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "body",
                            "value": comment.body,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].body).to.eq(comment.body)
            });
        
            it('should filter status without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({status: CommentStatusEnumType.trash});

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": comment.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].status).to.eq(comment.status)
            });
        
            it('should filter commentableType without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({commentableType: CommentableEnumType.product});

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentableType",
                            "value": comment.commentableType,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].commentableType).to.eq(comment.commentableType)
            });
        
            it('should filter commentableId without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({commentableId: '2'});

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentableId",
                            "value": comment.commentableId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].commentableId).to.eq(comment.commentableId)
            });
        
            it('should filter publishedAt without error', async () => {
                const comment = await Factory.model('App/Features/Comment/CommentModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "publishedAt",
                            "value": comment.publishedAt,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.comments.data[0].id).to.eq(comment.id)
                expect(res.data.comments.data[0].publishedAt).to.deep.eq(comment.publishedAt)
            });
        
        });

        describe('comment Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by authorId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('authorId', SortEnumType.DESC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by authorId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('authorId', SortEnumType.ASC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "authorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by body desc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('body', SortEnumType.DESC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "body": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by body asc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('body', SortEnumType.ASC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "body": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by publishedAt desc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('publishedAt', SortEnumType.DESC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by publishedAt asc when sortBy as array', async () => {
                await Factory.model('App/Features/Comment/CommentModel').createMany(5);

                const data = await CommentModel.query().orderBy('publishedAt', SortEnumType.ASC)

                const res = await client.query({
                    query: COMMENT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "publishedAt": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.comments.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('comment Http | create', () => {
        describe('comment Http | post | create', () => {
            it('create comment', async () => {
                authContext(await UserModel.first());
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.mutate({
                    mutation: COMMENT_POST_CREATE_GQL,
                    variables: {
                        body: 'nikk',
                        postId: post.id
                    }
                });

                expect(res.errors).to.be.undefined;
            });
        })
    });

    describe('comment Http | update', () => {

    });

    describe('comment Http | delete', () => {
        it('delete comment', async () => {
            authContext(await UserModel.first());
            const comment = await Factory.model('App/Features/Comment/CommentModel').create();

            const res = await client.mutate({
                mutation: `mutation commentDelete($id: [ID_CRYPTO]) {
                  commentDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: comment.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

});