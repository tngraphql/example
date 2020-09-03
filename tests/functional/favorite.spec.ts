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
import { FAVORITE_LIST_QUERY, FAVORITE_QUERY, FAVORITE_LIST_FOR_USER_QUERY } from './gql/favorite-gql';
import { SortEnumType } from '../../src/app/GraphQL/Types/SortEnumType';
import FavoriteModel from '../../src/app/Features/Favorite/FavoriteModel';
import ContactReplyModel from '../../src/app/Features/Contact/ContactReplyModel';

describe('favorite Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        const user = await UserModel.first();
        await Factory.model('App/Features/Favorite/FavoriteModel').create({
            userId: user.id,
            reload: true
        });
        await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5, { userId: user.id });
        authContext(user);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Favorite/FavoriteModel').reset();
    });

    describe('favorite Http | Index', () => {
        describe('favorite Http | index | base', () => {
            it('should response first favorite', async () => {
                const favorite = await FavoriteModel.first();

                const res = await client.query({
                    query: FAVORITE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.user.id).to.eq(favorite.userId);
            });

            it('should response first favorite using order by', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': {
                            'id': 'DESC'
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
            });

            it('should response first favorite when authentication', async () => {
                const favorite = await FavoriteModel.first();

                const res = await client.query({
                    query: FAVORITE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
            });
        });

        describe('User Http | index | filter', () => {

            it('should filter id without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': favorite.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.id).to.eq(favorite.id);
            })

            it('should filter favoriteableId without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableId',
                            'value': favorite.favoriteableId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableId).to.eq(favorite.favoriteableId);
            })

            it('should filter favoriteableType without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ favoriteableType: 'product' });

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableType',
                            'value': favorite.favoriteableType,
                            'operator': 'eq'
                        }
                    }
                });

                expect(res.errors).to.be.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableType).to.eq(favorite.favoriteableType);
            })

            it('should filter userId without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ userId: '8888' });

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'filter': {
                            'field': 'userId',
                            'value': favorite.userId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.userId).to.eq(favorite.userId);
            })

        });

        describe('User Http | index | sortBy', () => {

            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.id).to.eq(favorite.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.id).to.eq(favorite.id);
            })

            it('should sort by desc favoriteableId without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('favoriteableId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableId).to.eq(favorite.favoriteableId);
            })

            it('should sort by asc favoriteableId without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('favoriteableId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableId).to.eq(favorite.favoriteableId);
            })

            it('should sort by desc favoriteableType without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('favoriteableType', SortEnumType.DESC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableType).to.eq(favorite.favoriteableType);
            })

            it('should sort by asc favoriteableType without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('favoriteableType', SortEnumType.ASC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.favoriteableType).to.eq(favorite.favoriteableType);
            })

            it('should sort by desc userId without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('userId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.userId).to.eq(favorite.userId);
            })

            it('should sort by asc userId without error', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(3);

                const favorite = await FavoriteModel.query().orderBy('userId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: FAVORITE_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorite.id).to.eq(favorite.id);
                expect(res.data.favorite.userId).to.eq(favorite.userId);
            })

        });
    });

    describe('favorite Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('favorite Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: FAVORITE_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['type']).to.eq('AuthException');
            });

            it('should reponse list favorite', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);
                const favorites = await FavoriteModel.query();

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data).to.length(favorites.length);
                expect(res.data.favorites.total).to.eq(favorites.length);
                expect(res.data.favorites.currentPage).to.eq(1);
            });

            it('should response favorite paginate', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);
                const favorites = await FavoriteModel.query();

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data).to.length(2)
                expect(res.data.favorites.perPage).to.eq(2)
                expect(res.data.favorites.total).to.eq(favorites.length)
                expect(res.data.favorites.currentPage).to.eq(2)
            });
        });

        describe('favorite Http | list | filter', () => {

            it('should filter id without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': favorite.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
            });

            it('should filter favoriteableId without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableId',
                            'value': favorite.favoriteableId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].favoriteableId).to.eq(favorite.favoriteableId)
            });

            it('should filter favoriteableType without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ favoriteableType: 'product' });

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableType',
                            'value': favorite.favoriteableType,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].favoriteableType).to.eq(favorite.favoriteableType)
            });

            it('should filter userId without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ userId: '8888' });

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'userId',
                            'value': favorite.userId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].userId).to.eq(favorite.userId)
            });

        });

        describe('favorite Http | list | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('favoriteableId', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('favoriteableId', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableType desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('favoriteableType', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableType asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('favoriteableType', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by userId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('userId', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by userId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().orderBy('userId', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

        });
    });

    describe('favorite Http | favoritesUser', () => {
        let user;
        beforeEach(async () => {
            user = await UserModel.first();
        });

        describe('favorite Http | favoritesUser | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['type']).to.eq('AuthException');
            });

            it('should reponse favoritesUser favorite', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);
                const favorites = await FavoriteModel.query().where('userId', user.id);

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data).to.length(favorites.length);
                expect(res.data.favorites.total).to.eq(favorites.length);
                expect(res.data.favorites.currentPage).to.eq(1);
            });

            it('should response favorite paginate', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);
                const favorites = await FavoriteModel.query().where('userId', user.id);

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data).to.length(2)
                expect(res.data.favorites.perPage).to.eq(2)
                expect(res.data.favorites.total).to.eq(favorites.length)
                expect(res.data.favorites.currentPage).to.eq(2)
            });
        });

        describe('favorite Http | favoritesUser | filter', () => {

            it('should filter id without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ userId: user.id });

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': favorite.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
            });

            it('should filter favoriteableId without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({ userId: user.id });

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableId',
                            'value': favorite.favoriteableId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].favoriteableId).to.eq(favorite.favoriteableId)
            });

            it('should filter favoriteableType without error', async () => {
                const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create({
                    userId: user.id,
                    favoriteableType: 'product'
                });

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'filter': {
                            'field': 'favoriteableType',
                            'value': favorite.favoriteableType,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.favorites.data[0].id).to.eq(favorite.id)
                expect(res.data.favorites.data[0].favoriteableType).to.eq(favorite.favoriteableType)
            });
        });

        describe('favorite Http | favoritesUser | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('favoriteableId', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('favoriteableId', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableType desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('favoriteableType', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by favoriteableType asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('favoriteableType', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'favoriteableType': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by userId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('userId', SortEnumType.DESC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by userId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Favorite/FavoriteModel').createMany(5);

                const data = await FavoriteModel.query().where('userId', user.id).orderBy('userId', SortEnumType.ASC)

                const res = await client.query({
                    query: FAVORITE_LIST_FOR_USER_QUERY,
                    variables: {
                        'sortBy': [{
                            'userId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.favorites.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

        });
    });

    describe('favorite Http | create', () => {
        describe('favorite Http | create', () => {
            it('favorite post', async () => {
                await authContext(null);

                const res = await client.mutate({
                    mutation: `mutation favoriteCreate($favoriteableId: ID_CRYPTO, $favoriteableType: FavoriteTypeEnum) {
                      favoriteCreate(
                        favoriteableId: $favoriteableId
                        favoriteableType: $favoriteableType
                      ) {
                        id
                      }
                    }`,
                    variables: {
                        favoriteableId: '101',
                        favoriteableType: 'post'
                    }
                });

                expect(res.errors).to.be.undefined;
            });
        })
    });

    describe('favorite Http | update', () => {
        it('favorite contact', async () => {
            const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

            const res = await client.mutate({
                mutation: `mutation favoriteUpdate(
                  $id: ID_CRYPTO
                  $favoriteableId: ID_CRYPTO
                  $favoriteableType: FavoriteTypeEnum
                  $userId: ID_CRYPTO
                ) {
                  favoriteUpdate(
                    id: $id
                    favoriteableId: $favoriteableId
                    favoriteableType: $favoriteableType
                    userId: $userId
                  ) {
                    id
                    favoriteableType
                  }
                }
                `,
                variables: {
                    id: favorite.id,
                    favoriteableType: 'product'
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('favorite Http | delete', () => {
        it('delete contact', async () => {
            const favorite = await Factory.model('App/Features/Favorite/FavoriteModel').create();

            const res = await client.mutate({
                mutation: `mutation favoriteDelete($id: [ID_CRYPTO]) {
                  favoriteDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: favorite.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

});