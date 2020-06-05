/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 4:06 PM
 */

import {ApolloServerTestClient} from "apollo-server-testing/dist/createTestClient";
import {authContext, createServer, resetTables, seedDB} from "../helpers";
import {createTestClient} from "apollo-server-testing";
import {expect} from "chai";
import {PROFILE_QUERY, USER_LIST_QUERY, USER_QUERY, USER_ROLES_QUERY} from "./queries/user-query";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {Context} from "@tngraphql/graphql/dist/resolvers/context";
import {Gender, UserModel} from "../../src/app/UserModel";
import RoleModel from "../../src/app/Models/RoleModel";
import RoleUserModel from "../../src/app/Models/RoleUserModel";
const { gql } = require('apollo-server');

describe('User Http', () => {
    let client: ApolloServerTestClient;

    before(async () => {
        const server: any = await createServer();
        client = createTestClient(server);
    });

    beforeEach(async () => {
        await seedDB();
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
    });

    describe('User Http | profile', () => {
        it('trả về phải đúng là user đã login', async () => {
            const user = await UserModel.create({name: 'job'});

            authContext(user);

            const res = await client.query({
                query: PROFILE_QUERY
            });

            expect(res.errors).to.undefined;
            expect(res.data.profile.id).to.be.eq(user.id);
        });
    });

    describe('User Http | Index', () => {
        describe('User Http | index | base', () => {
            it('should response first user', async () => {
                const user = await UserModel.first();

                const res = await client.query({
                    query: USER_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.phone).to.eq(user.phone);
                expect(res.data.user.name).to.eq(user.name);
                expect(res.data.user.avatar).to.eq(user.avatar);
                // expect(res.data.user.dob).to.eq(user.dob);
                expect(res.data.user.email).to.eq(user.email);
                expect(res.data.user.gender).to.eq(user.gender);
            });

            it('should response first user using order by', async () => {
                const user = await UserModel.create({name: 'job'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should response first user when authentication', async () => {
                const user = await UserModel.first();

                authContext(await UserModel.create({name: 'job'}));

                const res = await client.query({
                    query: USER_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.phone).to.eq(user.phone);
                expect(res.data.user.name).to.eq(user.name);
                expect(res.data.user.avatar).to.eq(user.avatar);
                // expect(res.data.user.dob).to.eq(user.dob);
                expect(res.data.user.email).to.eq(user.email);
                expect(res.data.user.gender).to.eq(user.gender);
            });

            it('should response user filter', async () => {
                const user = await UserModel.create({name: 'job'})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should response user filter when authentication', async () => {
                const user = await UserModel.create({name: 'job'})

                authContext(user);

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });
        });

        describe('User Http | index | filter', () => {
            it('should filter id without error', async () => {
                const user = await UserModel.create({name: 'job'})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": user.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should filter phone without error', async () => {
                const user = await UserModel.create({name: 'job', phone: '0357096208'})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "phone",
                            "value": "0357096208",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should filter name without error', async () => {
                const user = await UserModel.create({name: 'job'})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should filter email without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com'})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "email",
                            "value": "job@gmail.com",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should filter gender without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male})

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "gender",
                            "value": Gender.male,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.gender).to.eq(user.gender);
            });

            it('should filter roleId without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "roleId",
                            "value": role.id,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should filter roleName without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male})
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "roleName",
                            "value": role.name,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });
        });

        describe('User Http | index | sortBy', () => {
            it('should order by when sortBy as array', async () => {
                await UserModel.create({name: 'job1'});
                await UserModel.create({name: 'job2'});
                const user = await UserModel.create({name: 'job3'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": "DESC"
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should sort by id without error', async () => {
                await UserModel.create({name: 'job1'});
                await UserModel.create({name: 'job2'});
                const user = await UserModel.create({name: 'job3'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
                expect(res.data.user.name).to.eq(user.name);
            });

            it('should sort by phone without error', async () => {
                await UserModel.create({phone: '1'});
                await UserModel.create({phone: '2'});
                const user = await UserModel.create({phone: '3'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "phone": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by name without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: '1'});
                await UserModel.create({name: '2'});
                const user = await UserModel.create({name: '3'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "name": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by email without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: 'job',email: 'a1@gmail.com'});
                await UserModel.create({name: 'job',email: 'a2@gmail.com'});
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "email": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by gender without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: 'job',email: 'a1@gmail.com', gender: Gender.male});
                await UserModel.create({name: 'job',email: 'a2@gmail.com', gender: Gender.male});
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "gender": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by roleId without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "roleId": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by roleName without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "sortBy": {
                            "roleName": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.id).to.eq(user.id);
            });

        });

        describe('User Http | index | roles', () => {
            it('should response role for user', async () => {
                const user = await UserModel.first();
                const role = await RoleModel.first();
                const roleNew = await RoleModel.create({name: 'guest'});

                await RoleUserModel.create({userId: user.id, roleId: roleNew.id})

                const res = await client.query({
                    query: USER_ROLES_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.user.roles).to.be.length(2);
                const roleResponse: RoleModel = res.data.user.roles[0];
                expect(roleResponse.id).to.be.eq(role.id);
            });
        });
    });

    describe('User Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('User Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: USER_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['code']).to.eq('E_AUTHENTICATION');
            });

            it('should reponse list user', async () => {
                await UserModel.create({name: 'job'});
                await UserModel.create({name: 'job2'});
                await UserModel.create({name: 'job3'});
                const user = await UserModel.create({name: 'job4', phone: '132545646', avatar: './image.jpg',
                    email: 'asd@gmail.com', gender: Gender.famale});

                const res = await client.query({
                    query: USER_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data).to.length(5);
                expect(res.data.users.total).to.eq(5);
                expect(res.data.users.currentPage).to.eq(1);
                const users = res.data.users.data;
                const userJob = users.find(x => x.id === user.id);

                expect(userJob.id).to.eq(user.id);
                expect(userJob.phone).to.eq(user.phone);
                expect(userJob.name).to.eq(user.name);
                expect(userJob.avatar).to.eq(user.avatar);
                // expect(userJob.dob).to.eq(user.dob);
                expect(userJob.email).to.eq(user.email);
                expect(userJob.gender).to.eq(user.gender);
            });

            it('should response user paginate', async () => {
                await UserModel.create({name: 'job'});
                const user1 = await UserModel.create({name: 'job2'});
                const user2 = await UserModel.create({name: 'job3'});
                const user = await UserModel.create({name: 'job4', phone: '132545646', avatar: './image.jpg',
                    email: 'asd@gmail.com', gender: Gender.famale});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data).to.length(2)
                expect(res.data.users.perPage).to.eq(2)
                expect(res.data.users.total).to.eq(5)
                expect(res.data.users.currentPage).to.eq(2)
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([user1, user2].map(x=>x.id))
            });
        });

        describe('User Http | list | filter', () => {
            it('should filter id without error', async () => {
                const user = await UserModel.create({name: 'job'})

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": user.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id)
            });

            it('should filter phone without error', async () => {
                const user = await UserModel.create({name: 'job', phone: '0357096208'})

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "phone",
                            "value": "0357096208",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
                expect(res.data.users.data[0].name).to.eq(user.name);
            });

            it('should filter name without error', async () => {
                const user = await UserModel.create({name: 'job'})

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
                expect(res.data.users.data[0].name).to.eq(user.name);
            });

            it('should filter email without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com'})

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "email",
                            "value": "job@gmail.com",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
                expect(res.data.users.data[0].name).to.eq(user.name);
            });

            it('should filter gender without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male})

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "gender",
                            "value": Gender.male,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
                expect(res.data.users.data[0].gender).to.eq(user.gender);
            });

            it('should filter roleId without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male})
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "roleId",
                            "value": role.id,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
            });

            it('should filter roleName without error', async () => {
                const user = await UserModel.create({name: 'job', email: 'job@gmail.com', gender: Gender.male})
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "roleName",
                            "value": role.name,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data[0].id).to.eq(user.id);
            });
        });

        describe('User Http | list | sortBy', () => {
            it('should order by when sortBy as array', async () => {
                await UserModel.create({name: 'job1'});
                await UserModel.create({name: 'job2'});
                const user = await UserModel.create({name: 'job3'});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": "DESC"
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([4,3,2,1]);
            });

            it('should sort by id without error', async () => {
                await UserModel.create({name: 'job1'});
                await UserModel.create({name: 'job2'});
                const user = await UserModel.create({name: 'job3'});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([4,3,2,1]);
            });

            it('should sort by phone without error', async () => {
                await UserModel.create({phone: '1'});
                await UserModel.create({phone: '2'});
                const user = await UserModel.create({phone: '3'});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "phone": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([4,3,2,1]);
                // expect(res.data.user.id).to.eq(user.id);
            });

            it('should sort by name without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: '1'});
                await UserModel.create({name: '2'});
                const user = await UserModel.create({name: '3'});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "name": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([3,2,1]);
            });

            it('should sort by email without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: 'job',email: 'a1@gmail.com'});
                await UserModel.create({name: 'job',email: 'a2@gmail.com'});
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com'});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "email": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([3,2,1]);
            });

            it('should sort by gender without error', async () => {
                await UserModel.truncate(true);
                await UserModel.create({name: 'job',email: 'a1@gmail.com', gender: Gender.male});
                await UserModel.create({name: 'job',email: 'a2@gmail.com', gender: Gender.male});
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "gender": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([3,1,2]);
            });

            it('should sort by roleId DESC without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "roleId": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([2,1]);
            });

            it('should sort by roleId ASC without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "roleId": "ASC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([1,2]);
            });

            it('should sort by roleName DESC without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "roleName": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([2,1]);
            });

            it('should sort by roleName ASC without error', async () => {
                const user = await UserModel.create({name: 'job',email: 'a3@gmail.com', gender: Gender.famale});
                const role = await RoleModel.create({name: 'super'});
                const role_user = await RoleUserModel.create({roleId: role.id, userId: user.id});

                const res = await client.query({
                    query: USER_LIST_QUERY,
                    variables: {
                        "sortBy": {
                            "roleName": "ASC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.users.data.map(x=>x.id)).to.deep.eq([1,2]);
            });
        });
    });

    describe('User Http | create', () => {

    });

    describe('User Http | update', () => {

    });

    describe('User Http | delete', () => {

    });

});