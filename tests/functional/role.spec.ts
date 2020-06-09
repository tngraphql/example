/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 10:28 AM
 */
import {ApolloServerTestClient} from "apollo-server-testing/dist/createTestClient";
import {authContext, createServer, resetTables, seedDB} from "../helpers";
import {createTestClient} from "apollo-server-testing";
import {Gender, UserModel} from "../../src/app/UserModel";
import {expect} from "chai";
import {ROLE_QUERY} from "./queries/role-query";
import RoleModel from "../../src/app/Models/RoleModel";
import {USER_QUERY} from "./queries/user-query";
import RoleUserModel from "../../src/app/Models/RoleUserModel";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";

describe('Role Http', () => {
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

    describe('Role Http | index', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('Role Http | index | base', () => {
            it('should response first role', async () => {
                const role = await RoleModel.first();

                const res = await client.query({
                    query: ROLE_QUERY
                });


                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
                expect(res.data.role.displayName).to.eq(role.displayName);
                expect(res.data.role.description).to.eq(role.description);
                expect(res.data.role.isDefault).to.be.true;
            });

            it('should response first role using order by', async () => {
                const role = await RoleModel.create({name: 'job'});

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

            it('should response first role when not authentication', async () => {
                authContext(null);

                const res = await client.query({
                    query: ROLE_QUERY
                });

                expect(res.errors).to.be.not.undefined;
            });

            it('should response role filter', async () => {
                const role = await RoleModel.create({name: 'job'})

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
            });
        });

        describe('Role Http | index | filter', async () => {
            it('should filter id without error', async () => {
                const role = await RoleModel.create({name: 'job'})

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
            });

            it('should filter name without error', async () => {
                const role = await RoleModel.create({name: 'job'})

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": "job",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
            });

            it('should filter displayName without error', async () => {
                const role = await RoleModel.create({name: 'job', displayName: 'job display'})

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "displayName",
                            "value": "job display",
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.displayName).to.eq(role.displayName);
            });

            it('should filter description without error', async () => {
                const role = await RoleModel.create({name: 'job', displayName: 'job display', description: 'job description'})

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": 'job description',
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.description).to.eq(role.description);
            });

            it('should filter isDefault without error', async () => {
                const role = await RoleModel.create({name: 'job', displayName: 'job display', description: 'job description'});

                const res = await client.query({
                    query: USER_QUERY,
                    variables: {
                        "filter": {
                            "field": "isDefault",
                            "value": true,
                            "operator": "eq"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
            });
        });

        describe('Role Http | index | sortBy', () => {
            it('should order by when sortBy as array', async () => {
                await RoleModel.create({name: 'job1'});
                await RoleModel.create({name: 'job2'});
                const role = await RoleModel.create({name: 'job3'});

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": "DESC"
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
                expect(res.data.role.name).to.eq(role.name);
            });

            it('should sort by id without error', async () => {
                await RoleModel.create({name: 'job1'});
                await RoleModel.create({name: 'job2'});
                const role = await RoleModel.create({name: 'job3'});

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
                expect(res.data.role.name).to.eq(role.name);
            });

            it('should sort by name without error', async () => {
                await RoleModel.truncate(true);
                await RoleModel.create({name: '1'});
                await RoleModel.create({name: '2'});
                const role = await RoleModel.create({name: '3'});

                const res = await client.query({
                    query: ROLE_QUERY,
                    variables: {
                        "sortBy": {
                            "name": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.role.id).to.eq(role.id);
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
    });
});