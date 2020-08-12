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
import {PRODUCTVENDOR_LIST_QUERY, PRODUCTVENDOR_QUERY} from "./gql/product-vendor-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {ProductVendorModel} from "../../src/app/Features/Product/Models/ProductVendorModel";

describe('productVendor Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
        await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(10);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Product/Models/ProductVendorModel').reset();
    });

    describe('productVendor Http | Index', () => {
        describe('productVendor Http | index | base', () => {
            it('should response first productVendor', async () => {
                const productVendor = await ProductVendorModel.first();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            });

            it('should response first productVendor using order by', async () => {
                const productVendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            });

            it('should response first productVendor when authentication', async () => {
                const productVendor = await ProductVendorModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const productVendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": productVendor.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            })
        
            it('should filter name without error', async () => {
                const productVendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": productVendor.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.name).to.eq(productVendor.name);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(3);

                const productVendor = await ProductVendorModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(3);

                const productVendor = await ProductVendorModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.id).to.eq(productVendor.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(3);

                const productVendor = await ProductVendorModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.name).to.eq(productVendor.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(3);

                const productVendor = await ProductVendorModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCTVENDOR_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendor.id).to.eq(productVendor.id);
                expect(res.data.productVendor.name).to.eq(productVendor.name);
            })
        
        });
    });

    describe('productVendor Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('productVendor Http | list | base', () => {
            it('should reponse list productVendor', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);
                const productVendors = await ProductVendorModel.query();

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data).to.length(productVendors.length);
                expect(res.data.productVendors.total).to.eq(productVendors.length);
                expect(res.data.productVendors.currentPage).to.eq(1);
            });

            it('should response productVendor paginate', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);
                const productVendors = await ProductVendorModel.query();

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data).to.length(2)
                expect(res.data.productVendors.perPage).to.eq(2)
                expect(res.data.productVendors.total).to.eq(productVendors.length)
                expect(res.data.productVendors.currentPage).to.eq(2)
            });
        });

        describe('productVendor Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const productVendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": productVendor.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data[0].id).to.eq(productVendor.id)
                expect(res.data.productVendors.data[0].id).to.eq(productVendor.id)
            });
        
            it('should filter name without error', async () => {
                const productVendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": productVendor.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data[0].id).to.eq(productVendor.id)
                expect(res.data.productVendors.data[0].name).to.eq(productVendor.name)
            });
        
        });

        describe('productVendor Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);

                const data = await ProductVendorModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);

                const data = await ProductVendorModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);

                const data = await ProductVendorModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Product/Models/ProductVendorModel').createMany(5);

                const data = await ProductVendorModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCTVENDOR_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.productVendors.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('productVendor Http | create', () => {
        it('create productVendor', async () => {
            authContext(await UserModel.first());

            const res = await client.mutate({
                mutation: `mutation productVendorCreate($name: String) {
                      data: productVendorCreate(name: $name) {
                        id
                        name
                      }
                    }
                    `,
                variables: {
                    name: 'Để xác minh cài đặt thành công, bạn thực hiện các bước sau'
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('productVendor Http | update', () => {
        it('update productVendor', async () => {
            authContext(await UserModel.first());
            const instance = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

            const res = await client.mutate({
                mutation: `mutation productVendorUpdate(
                  $id: ID_CRYPTO
                  $name: String
                ) {
                  data: productVendorUpdate(
                    id: $id
                    name: $name
                  ) {
                    id
                    name
                  }
                }
                `,
                variables: {
                    id: instance.id,
                    name: 'Để xác minh cài đặt thành công, bạn thực hiện các bước sau',
                }
            });
            expect(res.errors).to.be.undefined;
        });
    });

    describe('productVendor Http | delete', () => {
        it('delete productVendor', async () => {
            authContext(await UserModel.first());
            const instance = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

            const res = await client.mutate({
                mutation: `mutation productVendorDelete($id: [ID_CRYPTO]) {
                  productVendorDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: instance.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

});