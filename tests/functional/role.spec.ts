/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 4:06 PM
 */

import {createTestClient} from "apollo-server-testing";
import {authContext, createServer, resetTables, seedDB} from "../helpers";

const {gql} = require('apollo-server');
import {expect} from "chai";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";
import {UserModel} from "../../src/app/UserModel";
import RoleModel from "../../src/app/Models/RoleModel";
import {ROLE_LIST_QUERY, ROLE_QUERY} from "./gql/role-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {ApolloServerTestClient} from "../../src/Contracts/ApolloTestClient";

describe('role Http', () => {
    let client: ApolloServerTestClient;
    let server: any

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(await UserModel.first());
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
    });

    describe('role Http | Index', () => {
        describe('role Http | index | base', () => {
            it('should response first role', async () => {
                const role = await RoleModel.first();

                const res = await client.query({
                    query: ROLE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
            });

            it('should response first role using order by', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
            });

            it('should response first role when authentication', async () => {
                const role = await RoleModel.first();

                const res = await client.query({
                    query: ROLE_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
            });
        });

        describe('User Http | index | filter', () => {

            it('should filter id without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": role.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.id).to.eq(role.id);
            })

            it('should filter name without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": role.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
            })

            it('should filter displayName without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "displayName",
                            "value": role.displayName,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.displayName).to.eq(role.displayName);
            })

            it('should filter description without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": role.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.description).to.eq(role.description);
            })

        });

        describe('User Http | index | sortBy', () => {

            it('should sort by desc id without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.id).to.eq(role.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.id).to.eq(role.id);
            })

            it('should sort by desc name without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
            })

            it('should sort by desc displayName without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('displayName', SortEnumType.DESC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "displayName": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.displayName).to.eq(role.displayName);
            })

            it('should sort by asc displayName without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('displayName', SortEnumType.ASC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "displayName": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.displayName).to.eq(role.displayName);
            })

            it('should sort by desc description without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.description).to.eq(role.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Models/RoleModel').createMany(3);

                const role = await RoleModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.description).to.eq(role.description);
            })

        });
    });

    describe('role Http | list', () => {
        describe('role Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: ROLE_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['type']).to.eq('AuthException');
            });

            it('should reponse list role', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);
                const roles = await RoleModel.query();

                const res = await client.query({
                    query: ROLE_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data).to.length(roles.length);
                expect(res.data.roles.total).to.eq(roles.length);
                expect(res.data.roles.currentPage).to.eq(1);
            });

            it('should response role paginate', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);
                const roles = await RoleModel.query();

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data).to.length(2)
                expect(res.data.roles.perPage).to.eq(2)
                expect(res.data.roles.total).to.eq(roles.length)
                expect(res.data.roles.currentPage).to.eq(2)
            });
        });

        describe('role Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": role.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.roles.data[0].id).to.eq(role.id)
                expect(res.data.roles.data[0].id).to.eq(role.id)
            });

            it('should filter name without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": role.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.roles.data[0].id).to.eq(role.id)
                expect(res.data.roles.data[0].name).to.eq(role.name)
            });

            it('should filter displayName without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "displayName",
                            "value": role.displayName,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.roles.data[0].id).to.eq(role.id)
                expect(res.data.roles.data[0].displayName).to.eq(role.displayName)
            });

            it('should filter description without error', async () => {
                const role = await Factory.model('App/Models/RoleModel').create();

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": role.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.roles.data[0].id).to.eq(role.id)
                expect(res.data.roles.data[0].description).to.eq(role.description)
            });

        });

        describe('role Http | list | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by displayName desc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('displayName', SortEnumType.DESC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "displayName": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by displayName asc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('displayName', SortEnumType.ASC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "displayName": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Models/RoleModel').createMany(5);

                const data = await RoleModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: ROLE_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.roles.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

        });
    });

    describe('role Http | create', () => {
        describe('role Http | create', () => {
            it('create role', async () => {
                const res = await client.mutate({
                    mutation: `mutation roleCreate(
                      $name: String
                      $displayName: String
                      $description: String
                      $permissions: [String]
                    ) {
                      roleCreate(
                        name: $name
                        displayName: $displayName
                        description: $description
                        permissions: $permissions
                      ) {
                        id
                      }
                    }`,
                    variables: {
                        name: 'mod',
                        displayName: 'mod',
                        description: 'mod',
                        permissions: []
                    }
                });

                expect(res.errors).to.be.undefined;
            });
        })
    });

    describe('role Http | update', () => {

        it('update role', async () => {
            const role = await Factory.model('App/Models/RoleModel').create();

            const res = await client.mutate({
                mutation: `mutation roleUpdate(
                      $id: ID_CRYPTO
                      $displayName: String
                      $description: String
                      $permissions: [String]
                    ) {
                      roleUpdate(
                        id: $id
                        displayName: $displayName
                        description: $description
                        permissions: $permissions
                      ) {
                        id
                        name
                        displayName
                      }
                    }`,
                variables: {
                    id: role.id,
                    displayName: 'mod',
                    description: 'mod',
                    permissions: []
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('role Http | delete', () => {

        it('delete role', async () => {
            const role = await Factory.model('App/Models/RoleModel').create();

            const res = await client.mutate({
                mutation: `mutation roleDelete($id: [ID_CRYPTO]) {
                  roleDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: role.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

});