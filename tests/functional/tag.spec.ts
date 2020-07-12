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
import {TAG_LIST_QUERY, TAG_QUERY} from "./queries/tag-query";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import TagModel from "../../src/app/Features/Tag/TagModel";

describe('tag Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(await UserModel.first());
        await Factory.model('App/Features/Tag/TagModel').createMany(3);
    });

    afterEach(async () => {
        await resetTables();
        await Factory.model('App/Features/Tag/TagModel').reset();
        authContext(null);
    });

    describe('tag Http | Index', () => {
        describe('tag Http | index | base', () => {
            it('should response first tag', async () => {
                const tag = await TagModel.first();

                const res = await client.query({
                    query: TAG_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
            });

            it('should response first tag using order by', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
            });

            it('should response first tag when authentication', async () => {
                const tag = await TagModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: TAG_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": tag.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.id).to.eq(tag.id);
            })
        
            it('should filter name without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": tag.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.name).to.eq(tag.name);
            })
        
            it('should filter slug without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "filter": {
                            "field": "slug",
                            "value": tag.slug,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.slug).to.eq(tag.slug);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.id).to.eq(tag.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.id).to.eq(tag.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.name).to.eq(tag.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.name).to.eq(tag.name);
            })
        
            it('should sort by desc slug without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('slug', SortEnumType.DESC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.slug).to.eq(tag.slug);
            })

            it('should sort by asc slug without error', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(3);

                const tag = await TagModel.query().orderBy('slug', SortEnumType.ASC).first();

                const res = await client.query({
                    query: TAG_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tag.id).to.eq(tag.id);
                expect(res.data.tag.slug).to.eq(tag.slug);
            })
        
        });
    });

    describe('tag Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('tag Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: TAG_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['code']).to.eq('E_AUTHENTICATION');
            });

            it('should reponse list tag', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);
                const tags = await TagModel.query();

                const res = await client.query({
                    query: TAG_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data).to.length(tags.length);
                expect(res.data.tags.total).to.eq(tags.length);
                expect(res.data.tags.currentPage).to.eq(1);
            });

            it('should response tag paginate', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);
                const tags = await TagModel.query();

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data).to.length(2)
                expect(res.data.tags.perPage).to.eq(2)
                expect(res.data.tags.total).to.eq(tags.length)
                expect(res.data.tags.currentPage).to.eq(2)
            });
        });

        describe('tag Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": tag.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tags.data[0].id).to.eq(tag.id)
                expect(res.data.tags.data[0].id).to.eq(tag.id)
            });
        
            it('should filter name without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": tag.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tags.data[0].id).to.eq(tag.id)
                expect(res.data.tags.data[0].name).to.eq(tag.name)
            });
        
            it('should filter slug without error', async () => {
                const tag = await Factory.model('App/Features/Tag/TagModel').create();

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "slug",
                            "value": tag.slug,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.tags.data[0].id).to.eq(tag.id)
                expect(res.data.tags.data[0].slug).to.eq(tag.slug)
            });
        
        });

        describe('tag Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by slug desc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('slug', SortEnumType.DESC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by slug asc when sortBy as array', async () => {
                await Factory.model('App/Features/Tag/TagModel').createMany(5);

                const data = await TagModel.query().orderBy('slug', SortEnumType.ASC)

                const res = await client.query({
                    query: TAG_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "slug": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.tags.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('tag Http | create', () => {
        it('create tag', async () => {
            const res = await client.mutate({
                mutation: `mutation tagCreate(
                      $name: String
                      $slug: String
                    ) {
                      tagCreate(
                        name: $name
                        slug: $slug
                      ) {
                        id
                      }
                    }
                `,
                variables: {
                    name: 'mod',
                    slug: 'mod'
                }
            });

            expect(res.errors).to.be.undefined;
        });

        it('create tag auto gennerate slug', async () => {
            const res = await client.mutate({
                mutation: `mutation tagCreate(
                      $name: String
                      $slug: String
                    ) {
                      tagCreate(
                        name: $name
                        slug: $slug
                      ) {
                        id
                        slug
                      }
                    }
                `,
                variables: {
                    name: 'auto slug'
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.tagCreate.slug).to.be.eq('auto-slug');
        });
    });

    describe('tag Http | update', () => {
        it('update tag', async () => {
            const tag = await Factory.model('App/Features/Tag/TagModel').create();

            const res = await client.mutate({
                mutation: `mutation tagUpdate($id: ID_CRYPTO, $name: String, $slug: String) {
                  tagUpdate(id: $id, name: $name, slug: $slug) {
                    id
                    name
                    slug
                  }
                }
                `,
                variables: {
                    id: tag.id,
                    name: 'mod',
                    slug: 'mod',
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('tag Http | delete', () => {
        it('delete tag', async () => {
            const tag = await Factory.model('App/Features/Tag/TagModel').create();

            const res = await client.mutate({
                mutation: `mutation tagDelete($id: [ID_CRYPTO]) {
                  tagDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: tag.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });
});
