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
import { POST_LIST_QUERY, POST_QUERY } from './gql/post-gql';
import { SortEnumType } from '../../src/app/GraphQL/Types/SortEnumType';
import { PostModel } from '../../src/app/Features/Post/PostModel';
import { PostStatusEnumType } from '../../src/app/Features/Post/Types/Post/PostStatusEnumType';
import { PostCommentStatusEnumType } from '../../src/app/Features/Post/Types/Post/PostCommentStatusEnumType';
import { DateTime } from 'luxon';

describe('post Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
        await Factory.model('App/Features/Post/PostModel').createMany(5);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Post/PostModel').reset();
        await Factory.get('post_category').reset();
    });

    describe('post Http | Index', () => {
        describe('post Http | index | base', () => {
            it('should response first post', async () => {
                const post = await PostModel.first();

                const res = await client.query({
                    query: POST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
            });

            it('should response first post using order by', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': {
                            'id': 'DESC'
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
            });

            it('should response first post when authentication', async () => {
                const post = await PostModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: POST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
            });
        });

        describe('post Http | index | join category', () => {
            it('agfas', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();
                const postCategory = await Factory.get('post_category').create({ post_id: post.id });
                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'operator': 'eq',
                            'value': post.id,
                            'field': 'id'
                        }
                    }
                });
                expect(res.data.post.categories).to.be.length(1);
            });
        });

        describe('User Http | index | filter', () => {

            it('should filter id without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': post.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.id).to.eq(post.id);
            })

            it('should filter format without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ format: 2 });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'format',
                            'value': post.format,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.format).to.eq(post.format);
            })

            it('should filter isFeatured without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ isFeatured: 1 });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'isFeatured',
                            'value': post.isFeatured,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.isFeatured).to.eq(true);
            })

            it('should filter views without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ views: 1 });
                post.views = 1;
                await post.save();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'views',
                            'value': post.views,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.views).to.eq(post.views);
            })

            it('should filter name without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'name',
                            'value': post.name,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.name).to.eq(post.name);
            })

            it('should filter authorId without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ authorId: '2' });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'authorId',
                            'value': post.authorId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.authorId).to.eq(post.authorId);
            })

            it('should filter parentId without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ parentId: '2' });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'parentId',
                            'value': post.parentId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.parentId).to.eq(post.parentId);
            })

            it('should filter postStatus without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ postStatus: PostStatusEnumType.draft });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'postStatus',
                            'value': post.postStatus,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.postStatus).to.eq(post.postStatus);
            })

            it('should filter commentStatus without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ commentStatus: PostCommentStatusEnumType.closed });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'commentStatus',
                            'value': post.commentStatus,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentStatus).to.eq(post.commentStatus);
            })

            it('should filter commentCount without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ commentCount: 1 });
                post.commentCount = 1;
                await post.save();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'commentCount',
                            'value': post.commentCount,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentCount).to.eq(post.commentCount);
            })

            it('should filter description without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'description',
                            'value': post.description,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.description).to.eq(post.description);
            })

            it('should filter content without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'content',
                            'value': post.content,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.content).to.eq(post.content);
            })

            it('should filter publishedAt without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'publishedAt',
                            'value': post.publishedAt,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.publishedAt).to.deep.eq(post.publishedAt);
            })
        });

        describe('User Http | index | sortBy', () => {

            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.id).to.eq(post.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.id).to.eq(post.id);
            })

            it('should sort by desc format without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('format', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'format': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.format).to.eq(post.format);
            })

            it('should sort by asc format without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('format', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'format': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.format).to.eq(post.format);
            })

            it('should sort by desc views without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('views', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'views': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.views).to.eq(post.views);
            })

            it('should sort by asc views without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('views', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'views': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.views).to.eq(post.views);
            })

            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.name).to.eq(post.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.name).to.eq(post.name);
            })

            it('should sort by desc authorId without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('authorId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'authorId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.authorId).to.eq(post.authorId);
            })

            it('should sort by asc authorId without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('authorId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'authorId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.authorId).to.eq(post.authorId);
            })

            it('should sort by desc postStatus without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('postStatus', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'postStatus': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.postStatus).to.eq(post.postStatus);
            })

            it('should sort by asc postStatus without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('postStatus', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'postStatus': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.postStatus).to.eq(post.postStatus);
            })

            it('should sort by desc commentStatus without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('commentStatus', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentStatus': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentStatus).to.eq(post.commentStatus);
            })

            it('should sort by asc commentStatus without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('commentStatus', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentStatus': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentStatus).to.eq(post.commentStatus);
            })

            it('should sort by desc commentCount without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('commentCount', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentCount': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentCount).to.eq(post.commentCount);
            })

            it('should sort by asc commentCount without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('commentCount', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentCount': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.commentCount).to.eq(post.commentCount);
            })

            it('should sort by desc description without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.description).to.eq(post.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.description).to.eq(post.description);
            })

            it('should sort by desc content without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('content', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'content': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.content).to.eq(post.content);
            })

            it('should sort by asc content without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('content', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'content': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.content).to.eq(post.content);
            })

            it('should sort by desc language without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('language', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.language).to.eq(post.language);
            })

            it('should sort by asc language without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('language', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.language).to.eq(post.language);
            })

            it('should sort by desc languageMaster without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('languageMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.languageMaster).to.eq(post.languageMaster);
            })

            it('should sort by asc languageMaster without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('languageMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.languageMaster).to.eq(post.languageMaster);
            })

            it('should sort by desc publishedAt without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('publishedAt', SortEnumType.DESC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'publishedAt': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.publishedAt).to.deep.eq(post.publishedAt);
            })

            it('should sort by asc publishedAt without error', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(3);

                const post = await PostModel.query().orderBy('publishedAt', SortEnumType.ASC).first();

                const res = await client.query({
                    query: POST_QUERY,
                    variables: {
                        'sortBy': [{
                            'publishedAt': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.post.id).to.eq(post.id);
                expect(res.data.post.publishedAt).to.deep.eq(post.publishedAt);
            })
        });
    });

    describe('post Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('post Http | list | base', () => {
            it('should reponse list post', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);
                const posts = await PostModel.query();

                const res = await client.query({
                    query: POST_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data).to.length(posts.length);
                expect(res.data.posts.total).to.eq(posts.length);
                expect(res.data.posts.currentPage).to.eq(1);
            });

            it('should response post paginate', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);
                const posts = await PostModel.query();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data).to.length(2)
                expect(res.data.posts.perPage).to.eq(2)
                expect(res.data.posts.total).to.eq(posts.length)
                expect(res.data.posts.currentPage).to.eq(2)
            });
        });

        describe('post Http | list | filter', () => {

            it('should filter id without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': post.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].id).to.eq(post.id)
            });

            it('should filter format without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ format: 2 });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'format',
                            'value': post.format,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].format).to.eq(post.format)
            });

            it('should filter isFeatured without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ isFeatured: true });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'isFeatured',
                            'value': post.isFeatured,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].isFeatured).to.eq(true)
            });

            it('should filter views without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ views: 2 });
                post.views = 2;
                await post.save();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'views',
                            'value': post.views,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].views).to.eq(post.views)
            });

            it('should filter name without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'name',
                            'value': post.name,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].name).to.eq(post.name)
            });

            it('should filter authorId without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ authorId: '2' });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'authorId',
                            'value': post.authorId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].authorId).to.eq(post.authorId)
            });

            it('should filter parentId without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ parentId: '1' });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'parentId',
                            'value': post.parentId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].parentId).to.eq(post.parentId)
            });

            it('should filter postStatus without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ postStatus: PostStatusEnumType.draft });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'postStatus',
                            'value': post.postStatus,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].postStatus).to.eq(post.postStatus)
            });

            it('should filter commentStatus without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ commentStatus: PostCommentStatusEnumType.closed });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'commentStatus',
                            'value': post.commentStatus,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].commentStatus).to.eq(post.commentStatus)
            });

            it('should filter commentCount without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({ commentCount: 1 });
                post.commentCount = 1;
                await post.save();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'commentCount',
                            'value': post.commentCount,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].commentCount).to.eq(post.commentCount)
            });

            it('should filter description without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'description',
                            'value': post.description,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].description).to.eq(post.description)
            });

            it('should filter content without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create();

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'content',
                            'value': post.content,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].content).to.eq(post.content)
            });

            it('should filter publishedAt without error', async () => {
                const post = await Factory.model('App/Features/Post/PostModel').create({
                    publishedAt: DateTime.fromSQL('2020-06-16 11:25:42')
                });

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'publishedAt',
                            'value': post.publishedAt,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.posts.data[0].id).to.eq(post.id)
                expect(res.data.posts.data[0].publishedAt).to.deep.eq(post.publishedAt)
            });
        });

        describe('post Http | list | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by format desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('format', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'format': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by format asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('format', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'format': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by views desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('views', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'views': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by views asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('views', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'views': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'name': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by authorId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('authorId', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'authorId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by authorId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('authorId', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'authorId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by postStatus desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('postStatus', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'postStatus': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by postStatus asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('postStatus', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'postStatus': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentStatus desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('commentStatus', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentStatus': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentStatus asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('commentStatus', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentStatus': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentCount desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('commentCount', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentCount': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentCount asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('commentCount', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'commentCount': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'description': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by content desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('content', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'content': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by content asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('content', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'content': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('language', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('language', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'language': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('languageMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('languageMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'languageMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by publishedAt desc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('publishedAt', SortEnumType.DESC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'publishedAt': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by publishedAt asc when sortBy as array', async () => {
                await Factory.model('App/Features/Post/PostModel').createMany(5);

                const data = await PostModel.query().orderBy('publishedAt', SortEnumType.ASC)

                const res = await client.query({
                    query: POST_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'publishedAt': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.posts.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });
        });
    });

    describe('post Http | create', () => {
        describe('post Http | create', () => {
            it('post category', async () => {
                const user = await UserModel.query().where('id', 1).first();
                authContext(user);
                const category = [
                    await Factory.model('App/Features/Category/CategoryModel').create(),
                    await Factory.model('App/Features/Category/CategoryModel').create()
                ];


                const res = await client.mutate({
                    mutation: `mutation postCreate(
                      $name: String
                      $format: Int
                      $avatar: String
                      $thumbnailId: ID_CRYPTO
                      $postStatus: PostStatus = publish
                      $postPassword: String
                      $commentStatus: PostCommentStatus = open
                      $slug: String
                      $parentId: String = "0"
                      $description: Html
                      $content: Html
                      $tags: [String]
                      $categories: [ID_CRYPTO]
                      $seoTitle: String
                      $seoDescription: String
                      $seoKeyword: String
                      $meta: [MetaInput]
                    ) {
                      postCreate(
                        name: $name
                        format: $format
                        avatar: $avatar
                        thumbnailId: $thumbnailId
                        postStatus: $postStatus
                        postPassword: $postPassword
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
                        isFeatured
                        authorId
                        name
                        slug
                        language
                        languageMaster
                        parentId
                        tags {
                          name
                        }
                        categories {
                          name
                        }
                        meta {
                          id
                          metaKey
                          metaValue
                        }
                      }
                    }`,
                    variables: {
                        'name': 'asfsaf',
                        'content': 'ajsnjsaf',
                        'categories': category.map(x => x.id),
                        'tags': ['nguyen'],
                        'meta': [
                            {
                                'metaKey': 'afasgas',
                                'metaValue': 'asjfask'
                            }
                        ]
                    }
                });

                expect(res.errors).to.be.undefined;
                expect(res.data.postCreate.authorId).to.be.eq(user.id);
            });
        })
    });

    describe('post Http | update', () => {
        it('update post', async () => {
            authContext(await UserModel.query().where('id', 1).first());
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const category = [
                await Factory.model('App/Features/Category/CategoryModel').create(),
                await Factory.model('App/Features/Category/CategoryModel').create()
            ];

            const res = await client.mutate({
                mutation: `mutation postUpdate(
                  $id: ID_CRYPTO
                  $name: String
                  $format: Int
                  $avatar: String
                  $thumbnailId: ID_CRYPTO
                  $postStatus: PostStatus
                  $postPassword: String
                  $commentStatus: PostCommentStatus
                  $slug: String
                  $description: Html
                  $content: Html
                  $tags: [String]
                  $categories: [ID_CRYPTO]
                  $seoTitle: String
                  $seoDescription: String
                  $seoKeyword: String
                  $meta: [MetaInput]
                ) {
                  data: postUpdate(
                    id: $id
                    name: $name
                    format: $format
                    avatar: $avatar
                    thumbnailId: $thumbnailId
                    postStatus: $postStatus
                    postPassword: $postPassword
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
                    isFeatured
                    name
                    slug
                    language
                    languageMaster
                    parentId
                    authorId
                    tags {
                      name
                    }
                    categories {
                      name
                    }
                    meta {
                      id
                      metaKey
                      metaValue
                    }
                  }
                }
                `,
                variables: {
                    id: post.id,
                    'name': 'asfsaf',
                    'content': 'ajsnjsaf',
                    'categories': category.map(x => x.id),
                    'tags': ['nguyen'],
                    'meta': [
                        {
                            'metaKey': 'afasgas',
                            'metaValue': 'asjfask'
                        }
                    ]
                }
            });
            expect(res.errors).to.be.undefined;
        });
    });

    describe('post Http | delete', () => {
        it('delete post', async () => {
            authContext(await UserModel.query().where('id', 1).first());
            const post = await Factory.model('App/Features/Post/PostModel').create();

            const res = await client.mutate({
                mutation: `mutation postDelete($id: [ID_CRYPTO]) {
                  postDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: post.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });
});