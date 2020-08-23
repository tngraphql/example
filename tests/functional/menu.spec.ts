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
import {MENU_LIST_QUERY, MENU_QUERY} from "./gql/menu-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {MenuModel} from "../../src/app/Features/Menu/MenuModel";
import {MenuStatusEnumType} from "../../src/app/Features/Menu/Types/Enum/MenuStatusEnumType";

describe('menu Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        await Factory.model('App/Features/Menu/MenuModel').createMany(5);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Menu/MenuModel').reset();
    });

    describe('menu Http | Index', () => {
        describe('menu Http | index | base', () => {
            it('should response first menu', async () => {
                const menu = await MenuModel.first();

                const res = await client.query({
                    query: MENU_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
            });

            it('should response first menu using order by', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
            });

            it('should response first menu when authentication', async () => {
                const menu = await MenuModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: MENU_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": menu.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.id).to.eq(menu.id);
            })
        
            it('should filter name without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": menu.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.name).to.eq(menu.name);
            })
        
            it('should filter status without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create({status: MenuStatusEnumType.pending});

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": menu.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.status).to.eq(menu.status);
            })
        
            it('should filter description without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": menu.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.description).to.eq(menu.description);
            })

            it('should filter languageMaster without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "filter": {
                            "field": "languageMaster",
                            "value": menu.languageMaster,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.languageMaster).to.eq(menu.languageMaster);
            })
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.id).to.eq(menu.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.id).to.eq(menu.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.name).to.eq(menu.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.name).to.eq(menu.name);
            })
        
            it('should sort by desc status without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('status', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.status).to.eq(menu.status);
            })

            it('should sort by asc status without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('status', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.status).to.eq(menu.status);
            })
        
            it('should sort by desc description without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.description).to.eq(menu.description);
            })

            it('should sort by asc description without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.description).to.eq(menu.description);
            })
        
            it('should sort by desc language without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('language', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.language).to.eq(menu.language);
            })

            it('should sort by asc language without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('language', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.language).to.eq(menu.language);
            })
        
            it('should sort by desc languageMaster without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('languageMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.languageMaster).to.eq(menu.languageMaster);
            })

            it('should sort by asc languageMaster without error', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(3);

                const menu = await MenuModel.query().orderBy('languageMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: MENU_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menu.id).to.eq(menu.id);
                expect(res.data.menu.languageMaster).to.eq(menu.languageMaster);
            })
        });
    });

    describe('menu Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('menu Http | list | base', () => {
            it('should reponse list menu', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);
                const menus = await MenuModel.query();

                const res = await client.query({
                    query: MENU_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data).to.length(menus.length);
                expect(res.data.menus.total).to.eq(menus.length);
                expect(res.data.menus.currentPage).to.eq(1);
            });

            it('should response menu paginate', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);
                const menus = await MenuModel.query();

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data).to.length(2)
                expect(res.data.menus.perPage).to.eq(2)
                expect(res.data.menus.total).to.eq(menus.length)
                expect(res.data.menus.currentPage).to.eq(2)
            });
        });

        describe('menu Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": menu.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menus.data[0].id).to.eq(menu.id)
                expect(res.data.menus.data[0].id).to.eq(menu.id)
            });
        
            it('should filter name without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": menu.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menus.data[0].id).to.eq(menu.id)
                expect(res.data.menus.data[0].name).to.eq(menu.name)
            });
        
            it('should filter status without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create({
                    status: MenuStatusEnumType.pending
                });

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": menu.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menus.data[0].id).to.eq(menu.id)
                expect(res.data.menus.data[0].status).to.eq(menu.status)
            });
        
            it('should filter description without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": menu.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menus.data[0].id).to.eq(menu.id)
                expect(res.data.menus.data[0].description).to.eq(menu.description)
            });
        
            it('should filter languageMaster without error', async () => {
                const menu = await Factory.model('App/Features/Menu/MenuModel').create();

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "languageMaster",
                            "value": menu.languageMaster,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.menus.data[0].id).to.eq(menu.id)
                expect(res.data.menus.data[0].languageMaster).to.eq(menu.languageMaster)
            });
        });

        describe('menu Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by status desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('status', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by status asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('status', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by description desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by language desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('language', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by language asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('language', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "language": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by languageMaster desc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('languageMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by languageMaster asc when sortBy as array', async () => {
                await Factory.model('App/Features/Menu/MenuModel').createMany(5);

                const data = await MenuModel.query().orderBy('languageMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: MENU_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "languageMaster": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.menus.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        });
    });

    describe('menu Http | create', () => {

    });

    describe('menu Http | update', () => {

    });

    describe('menu Http | delete', () => {

    });

});