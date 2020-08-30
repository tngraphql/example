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
import {PRODUCT_MASTER_LIST_QUERY, PRODUCT_MASTER_QUERY, CREATE_PRODUCT, UPDATE_PRODUCT} from "./gql/product-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import {ProductMasterModel} from "../../src/app/Features/Product/Models/ProductMasterModel";
import {AttributeModel} from "../../src/app/Features/Product/Models/AttributeModel";
import {AttributeGroupModel} from "../../src/app/Features/Product/Models/AttributeGroupModel";
import {ProductBranchModel} from "../../src/app/Features/Product/Models/ProductBranchModel";
import {ProductBranchToAttributeModel} from "../../src/app/Features/Product/Models/ProductBranchToAttributeModel";
import {ProductImageModel} from "../../src/app/Features/Product/Models/ProductImageModel";
import {ProductCategoryModel} from "../../src/app/Features/Product/Models/ProductCategoryModel";
import {InventoryModel} from "../../src/app/Features/Product/Models/InventoryModel";
import {ProductmetaModel} from "../../src/app/Features/Product/Models/ProductmetaModel";
import {ProductRewardModel} from "../../src/app/Features/Product/Models/ProductRewardModel";
import {ProductTagModel} from "../../src/app/Features/Product/Models/ProductTagModel";
import {ProductTypeModel} from "../../src/app/Features/Product/Models/ProductTypeModel";
import {ProductTypeMetaModel} from "../../src/app/Features/Product/Models/ProductTypeMetaModel";
import {ProductVendorModel} from "../../src/app/Features/Product/Models/ProductVendorModel";
import {Application} from "@tngraphql/illuminate";
import {ProductMasterRepository} from "../../src/app/Features/Product/Repositories/ProductMasterRepository";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {ProductMasterKindEnumType} from "../../src/app/Features/Product/Types/Product/ProductMasterKindEnumType";
import {ProductCommentStatusEnumType} from "../../src/app/Features/Product/Types/Product/ProductCommentStatusEnumType";

describe('productMaster Http', () => {
    let client: ApolloServerTestClient;
    let server: any;
    let app: Application;
    let context;
    let repo: ProductMasterRepository;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
        app = Application.getInstance<Application>()
        context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
        repo = await app.make(ProductMasterRepository, context);
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);

        await repo.builderCreate({
            name: "milk",
            content: 'vina milk',
            branches: [
                {
                    code: "milk"
                }
            ]
        });
        await repo.builderCreate({
            name: "milk",
            content: 'vina milk',
            branches: [
                {
                    code: "milk1"
                }
            ]
        });
        await repo.builderCreate({
            name: "milk",
            content: 'vina milk',
            branches: [
                {
                    code: "milk2"
                }
            ]
        });
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);

        await ProductMasterModel.truncate();
        await AttributeModel.truncate();
        await AttributeGroupModel.truncate();
        await ProductBranchModel.truncate();
        await ProductBranchToAttributeModel.truncate();
        await ProductImageModel.truncate();
        await ProductCategoryModel.truncate();
        await InventoryModel.truncate();
        await ProductmetaModel.truncate();
        await ProductRewardModel.truncate();
        await ProductTagModel.truncate();
        await ProductTypeModel.truncate();
        await ProductTypeMetaModel.truncate();
        await ProductVendorModel.truncate();
        await Factory.model('App/Features/Media/MediaModel').reset();
    });

    describe('productMaster Http | Index', () => {
        describe('productMaster Http | index | base', () => {
            it('should response first productMaster', async () => {
                const product_master = await ProductMasterModel.first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
            });

            it('should response first productMaster using order by', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
            });

            it('should response first productMaster when authentication', async () => {
                const product_master = await ProductMasterModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": product_master.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.id).to.eq(product_master.id);
            })
        
            it('should filter name without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": product_master.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.name).to.eq(product_master.name);
            })
        
            it('should filter kind without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "kind",
                            "value": ProductMasterKindEnumType.single,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.kind).to.eq(ProductMasterKindEnumType.single);
            })
        
            it('should filter imageType without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    imageType: 'type',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "imageType",
                            "value": product_master.imageType,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.imageType).to.eq(product_master.imageType);
            })
        
            it('should filter isFeatured without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });
                product_master.isFeatured = true;
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "isFeatured",
                            "value": product_master.isFeatured,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.isFeatured).to.eq(product_master.isFeatured);
            })
        
            it('should filter views without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                product_master.views = 273673;
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "views",
                            "value": product_master.views,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.views).to.eq(product_master.views);
            })
        
            it('should filter commentStatus without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    commentStatus: ProductCommentStatusEnumType.open,
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "commentStatus",
                            "value": product_master.commentStatus,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.commentStatus).to.eq(ProductCommentStatusEnumType.open);
            })
        
            it('should filter description without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    description: 'should filter description without error',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "description",
                            "value": product_master.description,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.description).to.eq(product_master.description);
            })
        
            it('should filter content without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'should filter content without error',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "content",
                            "value": product_master.content,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.content).to.eq(product_master.content);
            })
        
            it('should filter productTypeId without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    productTypeId: '1232',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "productTypeId",
                            "value": product_master.productTypeId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productTypeId).to.eq(product_master.productTypeId);
            })
        
            it('should filter productVendorId without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    productVendorId: '7282',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "filter": {
                            "field": "productVendorId",
                            "value": product_master.productVendorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productVendorId).to.eq(product_master.productVendorId);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.id).to.eq(product_master.id);
            })

            it('should sort by asc id without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.id).to.eq(product_master.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.name).to.eq(product_master.name);
            })

            it('should sort by asc name without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.name).to.eq(product_master.name);
            })
        
            it('should sort by desc views without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('views', SortEnumType.DESC).first();
                product_master.views = 234234;
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "views": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.views).to.eq(product_master.views);
            })

            it('should sort by desc commentCount without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('commentCount', SortEnumType.DESC).first();

                product_master.commentCount = 1232;
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.commentCount).to.eq(product_master.commentCount);
            })

            it('should sort by desc description without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('description', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.description).to.eq(product_master.description);
            })

            it('should sort by asc description without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('description', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.description).to.eq(product_master.description);
            })
        
            it('should sort by desc content without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('content', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.content).to.eq(product_master.content);
            })

            it('should sort by asc content without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('content', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.content).to.eq(product_master.content);
            })
        
            it('should sort by desc productTypeId without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('productTypeId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "productTypeId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productTypeId).to.eq(product_master.productTypeId);
            })

            it('should sort by asc productTypeId without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('productTypeId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "productTypeId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productTypeId).to.eq(product_master.productTypeId);
            })
        
            it('should sort by desc productVendorId without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('productVendorId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "productVendorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productVendorId).to.eq(product_master.productVendorId);
            })

            it('should sort by asc productVendorId without error', async () => {
                await Promise.all(
                    [1,2,3].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const product_master = await ProductMasterModel.query().orderBy('productVendorId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_MASTER_QUERY,
                    variables: {
                        "sortBy": [{
                            "productVendorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_master.id);
                expect(res.data.data.productVendorId).to.eq(product_master.productVendorId);
            })
        
        });
    });

    describe('productMaster Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('productMaster Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY
                });
                expect(res.errors).to.be.undefined;
            });

            it('should reponse list product_master', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );
                const product_masters = await ProductMasterModel.query();

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data).to.length(product_masters.length);
                expect(res.data.data.total).to.eq(product_masters.length);
                expect(res.data.data.currentPage).to.eq(1);
            });

            it('should response productMaster paginate', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );
                const product_masters = await ProductMasterModel.query();

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data).to.length(2)
                expect(res.data.data.perPage).to.eq(2)
                expect(res.data.data.total).to.eq(product_masters.length)
                expect(res.data.data.currentPage).to.eq(2)
            });
        });

        describe('productMaster Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": product_master.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_master.id)
                expect(res.data.data.data[0].id).to.eq(product_master.id)
            });
        
            it('should filter name without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": product_master.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_master.id)
                expect(res.data.data.data[0].name).to.eq(product_master.name)
            });
        
            it('should filter kind without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "kind",
                            "value": product_master.kind,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].kind).to.eq(product_master.kind)
            });
        
            it('should filter productTypeId without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });

                product_master.productTypeId = '123213';
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "productTypeId",
                            "value": product_master.productTypeId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_master.id)
                expect(res.data.data.data[0].productTypeId).to.eq(product_master.productTypeId)
            });
        
            it('should filter productVendorId without error', async () => {
                const product_master = await repo.builderCreate({
                    name: "milk-1",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk-1"
                        }
                    ]
                });
                product_master.productVendorId = '12323';
                await product_master.save();

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "productVendorId",
                            "value": product_master.productVendorId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_master.id)
                expect(res.data.data.data[0].productVendorId).to.eq(product_master.productVendorId)
            });
        
        });

        describe('productMaster Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by isFeatured desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('isFeatured', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "isFeatured": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by isFeatured asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('isFeatured', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "isFeatured": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by views desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('views', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "views": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by views asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('views', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "views": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by commentStatus desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('commentStatus', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentStatus asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('commentStatus', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentStatus": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by commentCount desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('commentCount', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by commentCount asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('commentCount', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "commentCount": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by description desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('description', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by description asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('description', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "description": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by content desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('content', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by content asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('content', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by productTypeId desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('productTypeId', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "productTypeId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by productTypeId asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('productTypeId', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "productTypeId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by productVendorId desc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('productVendorId', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "productVendorId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by productVendorId asc when sortBy as array', async () => {
                await Promise.all(
                    [1,2,3,4,5].map(x => {
                        return repo.builderCreate({
                            name: "milk-1-"+x,
                            content: 'content',
                            branches: [
                                {
                                    code: "milk-1-"+x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductMasterModel.query().orderBy('productVendorId', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_MASTER_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "productVendorId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('productMaster Http | create', () => {
        it('Err when not authentication', async () => {
            authContext(null);
            const res = await client.mutate({
                mutation: CREATE_PRODUCT,
                variables: {
                    name: 'HTmilk',
                    content: 'Sữa HT milk'
                }
            });

            expect(res.errors).to.be.not.undefined;
        });

        it('productMaster create', async () => {
            const user = await UserModel.create({name: 'job'});
            authContext(user);

            const res = await client.mutate({
                mutation: CREATE_PRODUCT,
                variables: {
                    name: 'HTmilk',
                    content: 'Sữa HT milk',
                    branches: [
                        {
                            code: "milk"
                        }
                    ]
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('productMaster Http | update', () => {
        it('Err when not authentication', async () => {
            const res = await client.mutate({
                mutation: UPDATE_PRODUCT,
                variables: {
                    id: '123',
                    name: 'safs',
                    kind: ProductMasterKindEnumType.single
                }
            });
            expect(res.errors).to.be.not.undefined;
        });
        it('product master update', async () => {
            const user = await UserModel.create({name: 'job'});
            authContext(user);

            const product = await repo.builderCreate({
                name: "milk-1",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk-1"
                    }
                ]
            });

            const name = 'Tên sản phẩm';

            const res = await client.mutate({
                mutation: UPDATE_PRODUCT,
                variables: {
                    id: product.id,
                    name,
                    kind: ProductMasterKindEnumType.single
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('productMaster Http | delete', () => {
        it('Err when not authentication', async () => {
            const res = await client.mutate({
                mutation: `mutation productDelete($id: [ID_CRYPTO]) {
                  productDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: 123
                }
            });

            expect(res.errors).to.be.not.undefined;
        });
        it('product delete', async () => {
            const user = await UserModel.create({name: 'job'});
            authContext(user);

            const product = await repo.builderCreate({
                name: "milk-1",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk-1"
                    }
                ]
            });

            const res = await client.mutate({
                mutation: `mutation productDelete($id: [ID_CRYPTO]) {
                  productDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: product.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('productMaster http | change feature', () => {
        it('Err when not authentication', async () => {
            const res = await client.mutate({
                mutation: `mutation changeFeatured {
                  productChangeFeature(id: "31", isFeatured: false) {
                    id
                    isFeatured
                  }
                }
                `
            });

            expect(res.errors).to.be.not.undefined;
        });

        it('change featured', async () => {
            const user = await UserModel.create({name: 'job'});
            authContext(user);

            const product = await repo.builderCreate({
                name: "milk-1",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk-1"
                    }
                ]
            });

            const res = await client.mutate({
                mutation: `mutation changeFeatured($id: ID_CRYPTO) {
                  data: productChangeFeature(id: $id, isFeatured: true) {
                    id
                    isFeatured
                  }
                }
                `,
                variables: {
                    id: product.id
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.data.isFeatured).to.be.true
        });
    });

});