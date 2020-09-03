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
import { PRODUCT_BRANCH_LIST_QUERY, PRODUCT_BRANCH_QUERY } from './gql/product-branch-gql';
import { SortEnumType } from '../../src/app/GraphQL/Types/SortEnumType';
import { ProductBranchModel } from '../../src/app/Features/Product/Models/ProductBranchModel';
import { Application } from '@tngraphql/illuminate';
import { ProductMasterRepository } from '../../src/app/Features/Product/Repositories/ProductMasterRepository';
import { RequestGuard } from '@tngraphql/auth/dist/src/Guards/RequestGuard';
import { ProductMasterModel } from '../../src/app/Features/Product/Models/ProductMasterModel';
import { AttributeModel } from '../../src/app/Features/Product/Models/AttributeModel';
import { AttributeGroupModel } from '../../src/app/Features/Product/Models/AttributeGroupModel';
import { ProductBranchToAttributeModel } from '../../src/app/Features/Product/Models/ProductBranchToAttributeModel';
import { ProductImageModel } from '../../src/app/Features/Product/Models/ProductImageModel';
import { ProductCategoryModel } from '../../src/app/Features/Product/Models/ProductCategoryModel';
import { InventoryModel } from '../../src/app/Features/Product/Models/InventoryModel';
import { ProductmetaModel } from '../../src/app/Features/Product/Models/ProductmetaModel';
import { ProductRewardModel } from '../../src/app/Features/Product/Models/ProductRewardModel';
import { ProductTagModel } from '../../src/app/Features/Product/Models/ProductTagModel';
import { ProductTypeModel } from '../../src/app/Features/Product/Models/ProductTypeModel';
import { ProductTypeMetaModel } from '../../src/app/Features/Product/Models/ProductTypeMetaModel';
import { ProductVendorModel } from '../../src/app/Features/Product/Models/ProductVendorModel';
import { SelectionCriteria } from '../../src/Repositories/Criteria/SelectionCriteria';
import { ProductMasterKindEnumType } from '../../src/app/Features/Product/Types/Product/ProductMasterKindEnumType';

describe('productBranch Http', () => {
    let client: ApolloServerTestClient;
    let server: any;
    let app: Application;
    let context;
    let repo: ProductMasterRepository;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
        app = Application.getInstance<Application>()
        context = { context: { auth: new RequestGuard(() => UserModel.first(), {}, {} as any) } } as any;
        repo = await app.make(ProductMasterRepository, context);
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);

        await repo.builderCreate({
            name: 'milk',
            content: 'vina milk',
            branches: [
                {
                    code: 'milk'
                }
            ]
        });
        await repo.builderCreate({
            name: 'milk',
            content: 'vina milk',
            branches: [
                {
                    code: 'milk1'
                }
            ]
        });
        await repo.builderCreate({
            name: 'milk',
            content: 'vina milk',
            branches: [
                {
                    code: 'milk2'
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

    describe('productBranch Http | Index', () => {
        describe('productBranch Http | index | base', () => {
            it('should response first productBranch', async () => {
                const product_branch = await ProductBranchModel.first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
            });

            it('should response first productBranch using order by', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': {
                            'id': 'DESC'
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
            });

            it('should response first productBranch when authentication', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
            });
        });

        describe('User Http | index | filter', () => {

            it('should filter id without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': product_branch.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.id).to.eq(product_branch.id);
            })

            it('should filter sku without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            sku: 'milk-sku',
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'sku',
                            'value': product_branch.sku,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.sku).to.eq(product_branch.sku);
            })

            it('should filter code without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'code',
                            'value': product_branch.code,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.code).to.eq(product_branch.code);
            })

            it('should filter fullname without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'fullname',
                            'value': product_branch.fullname,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.fullname).to.eq(product_branch.fullname);
            })

            it('should filter productMasterId without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'productMasterId',
                            'value': product_branch.productMasterId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.productMasterId).to.eq(product_branch.productMasterId);
            })

            it('should filter price without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()
                product_branch.price = 285434;
                await product_branch.save();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'price',
                            'value': product_branch.price,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.price).to.eq(product_branch.price);
            })

            it('should filter priceSale without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()
                product_branch.priceSale = 285434;
                await product_branch.save();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'filter': {
                            'field': 'priceSale',
                            'value': product_branch.priceSale,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.priceSale).to.eq(product_branch.priceSale);
            })
        });

        describe('User Http | index | sortBy', () => {

            it('should sort by desc id without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.id).to.eq(product_branch.id);
            })

            it('should sort by asc id without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.id).to.eq(product_branch.id);
            })

            it('should sort by desc sku without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('sku', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'sku': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.sku).to.eq(product_branch.sku);
            })

            it('should sort by asc sku without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('sku', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'sku': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.sku).to.eq(product_branch.sku);
            })

            it('should sort by desc code without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('code', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'code': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.code).to.eq(product_branch.code);
            })

            it('should sort by asc code without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('code', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'code': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.code).to.eq(product_branch.code);
            })

            it('should sort by desc isMaster without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('isMaster', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'isMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.isMaster).to.eq(product_branch.isMaster);
            })

            it('should sort by asc isMaster without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('isMaster', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'isMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.isMaster).to.eq(product_branch.isMaster);
            })

            it('should sort by desc fullname without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('fullname', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'fullname': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.fullname).to.eq(product_branch.fullname);
            })

            it('should sort by asc fullname without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('fullname', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'fullname': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.fullname).to.eq(product_branch.fullname);
            })

            it('should sort by desc unitValue without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('unitValue', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitValue': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.unitValue).to.eq(product_branch.unitValue);
            })

            it('should sort by asc unitValue without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('unitValue', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitValue': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.unitValue).to.eq(product_branch.unitValue);
            })

            it('should sort by desc unitName without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('unitName', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitName': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.unitName).to.eq(product_branch.unitName);
            })

            it('should sort by asc unitName without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('unitName', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitName': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.unitName).to.eq(product_branch.unitName);
            })

            it('should sort by desc productMasterId without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('productMasterId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'productMasterId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.productMasterId).to.eq(product_branch.productMasterId);
            })

            it('should sort by asc productMasterId without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('productMasterId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'productMasterId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.productMasterId).to.eq(product_branch.productMasterId);
            })

            it('should sort by desc price without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('price', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'price': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.price).to.eq(product_branch.price);
            })

            it('should sort by asc price without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('price', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'price': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.price).to.eq(product_branch.price);
            })

            it('should sort by desc priceSale without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('priceSale', SortEnumType.DESC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'priceSale': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.priceSale).to.eq(product_branch.priceSale);
            })

            it('should sort by asc priceSale without error', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const product_branch = await ProductBranchModel.query().orderBy('priceSale', SortEnumType.ASC).first();

                const res = await client.query({
                    query: PRODUCT_BRANCH_QUERY,
                    variables: {
                        'sortBy': [{
                            'priceSale': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.id).to.eq(product_branch.id);
                expect(res.data.data.priceSale).to.eq(product_branch.priceSale);
            })
        });
    });

    describe('productBranch Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('productBranch Http | list | base', () => {
            it('should reponse list product_branch', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );
                const product_branchs = await ProductBranchModel.query();

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data).to.length(product_branchs.length);
                expect(res.data.data.total).to.eq(product_branchs.length);
                expect(res.data.data.currentPage).to.eq(1);
            });

            it('should response productBranch paginate', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );
                const product_branchs = await ProductBranchModel.query();

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data).to.length(2)
                expect(res.data.data.perPage).to.eq(2)
                expect(res.data.data.total).to.eq(product_branchs.length)
                expect(res.data.data.currentPage).to.eq(2)
            });
        });

        describe('productBranch Http | list | filter', () => {

            it('should filter id without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'id',
                            'value': product_branch.id,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
            });

            it('should filter sku without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()
                product_branch.sku = 'ajsfnks';
                await product_branch.save();

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'sku',
                            'value': product_branch.sku,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].sku).to.eq(product_branch.sku)
            });

            it('should filter code without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'code',
                            'value': product_branch.code,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].code).to.eq(product_branch.code)
            });

            it('should filter fullname without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'fullname',
                            'value': product_branch.fullname,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].fullname).to.eq(product_branch.fullname)
            });

            it('should filter productMasterId without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'productMasterId',
                            'value': product_branch.productMasterId,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].productMasterId).to.eq(product_branch.productMasterId)
            });

            it('should filter price without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()
                product_branch.price = 132213
                await product_branch.save();

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'price',
                            'value': product_branch.price,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].price).to.eq(product_branch.price)
            });

            it('should filter priceSale without error', async () => {
                await repo.builderCreate({
                    name: 'milk-1',
                    content: 'vina milk',
                    branches: [
                        {
                            code: 'milk-1'
                        }
                    ]
                });
                const product_branch = await ProductBranchModel.query().orderBy('id', 'desc').first()
                product_branch.priceSale = 132213
                await product_branch.save();

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'filter': {
                            'field': 'priceSale',
                            'value': product_branch.priceSale,
                            'operator': 'eq'
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.data.data[0].id).to.eq(product_branch.id)
                expect(res.data.data.data[0].priceSale).to.eq(product_branch.priceSale)
            });

        });

        describe('productBranch Http | list | sortBy', () => {

            it('should order by id desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'id': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by sku desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('sku', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'sku': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by sku asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('sku', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'sku': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by code desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('code', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'code': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by code asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('code', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'code': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by isMaster desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('isMaster', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'isMaster': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by isMaster asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('isMaster', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'isMaster': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by fullname desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('fullname', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'fullname': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by fullname asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('fullname', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'fullname': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by unitValue desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('unitValue', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitValue': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by unitValue asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('unitValue', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitValue': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by unitName desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('unitName', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitName': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by unitName asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('unitName', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'unitName': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by productMasterId desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('productMasterId', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'productMasterId': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by productMasterId asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('productMasterId', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'productMasterId': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by price desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('price', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'price': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by price asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('price', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'price': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by priceSale desc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('priceSale', SortEnumType.DESC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'priceSale': SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by priceSale asc when sortBy as array', async () => {
                await Promise.all(
                    [1, 2, 3, 4, 5].map(x => {
                        return repo.builderCreate({
                            name: 'milk-1-' + x,
                            content: 'content',
                            branches: [
                                {
                                    code: 'milk-1-' + x
                                }
                            ]
                        });
                    })
                );

                const data = await ProductBranchModel.query().orderBy('priceSale', SortEnumType.ASC)

                const res = await client.query({
                    query: PRODUCT_BRANCH_LIST_QUERY,
                    variables: {
                        'sortBy': [{
                            'priceSale': SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.data.data.map(x => x.id)).to.deep.eq(data.map(x => x.id));
            });

        });
    });

    describe('productBranch Http | delete', () => {
        it('Err when not authentication', async () => {
            const res = await client.mutate({
                mutation: `mutation productBranchDelete($id: [ID_CRYPTO]) {
                  productBranchDelete(id: $id) {
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

        it('should delete all product', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1'
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation productBranchDelete($id: [ID_CRYPTO]) {
                  productBranchDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });

            const p = await repo.query().firstBy(ins.id);
            expect(res.errors).to.be.undefined;
            expect(p).to.be.null;
        });

        it('should delete branch for product', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    },
                    {
                        code: 'milk-2',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'X'
                            }
                        ]
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation productBranchDelete($id: [ID_CRYPTO]) {
                  productBranchDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: product.branches[1].id
                }
            });

            const p = await repo.query()
                                .pushCriteria(new SelectionCriteria({
                                    columns: ['*'],
                                    preloads: [
                                        {
                                            name: 'branches',
                                            columns: ['*']
                                        }
                                    ]
                                }))
                                .firstBy(ins.id)

            expect(res.errors).to.be.undefined;
            expect(p.branches).to.be.length(1);
        });

        it('should move branch master to branch next and delete branch instance', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    },
                    {
                        code: 'milk-2',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'X'
                            }
                        ]
                    },
                    {
                        code: 'milk-3',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'Z'
                            }
                        ]
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation productBranchDelete($id: [ID_CRYPTO]) {
                  productBranchDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });
            const p = await repo.query()
                                .pushCriteria(new SelectionCriteria({
                                    columns: ['*'],
                                    preloads: [
                                        {
                                            name: 'branches',
                                            columns: ['*']
                                        }
                                    ]
                                }))
                                .firstBy(ins.id)

            expect(res.errors).to.be.undefined;
            expect(p.branches).to.be.length(2);
            expect(p.branches.find(x => x.isMaster)).to.be.not.undefined;
        });

        it('should move kind branch to single when delete all branch', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation productBranchDelete($id: [ID_CRYPTO]) {
                  productBranchDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });
            const p = await repo.query()
                                .pushCriteria(new SelectionCriteria({
                                    columns: ['*'],
                                    preloads: [
                                        {
                                            name: 'branches',
                                            columns: ['*']
                                        }
                                    ]
                                }))
                                .firstBy(ins.id)

            expect(res.errors).to.be.undefined;
            expect(p.kind).to.be.eq(ProductMasterKindEnumType.single)
            expect(p.branches).to.be.length(1);
            expect(p.branches.find(x => x.isMaster)).to.be.not.undefined;
        });
    });

    describe('productBranch Http | inventory adjust quantity', () => {
        it('Err when not authentication', async () => {
            const res = await client.mutate({
                mutation: `mutation changeQuantity($id: ID_CRYPTO){
                  data: inventory_adjust_quantity(productBranchId: $id, quantity: 10){
                    id
                    quantity
                  }
                }
                `,
                variables: {
                    id: 123
                }
            });

            expect(res.errors).to.be.not.undefined;
        });

        it('inventory adjust quantity', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation changeQuantity($id: ID_CRYPTO){
                  data: inventory_adjust_quantity(productBranchId: $id, quantity: 10){
                    id
                    quantity
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.data.quantity).to.be.eq(10)
        });

        it('adjust quantity up', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ],
                        inventory: {
                            quantity: 10
                        }
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation changeQuantity($id: ID_CRYPTO){
                  data: inventory_adjust_quantity(productBranchId: $id, quantity: 10){
                    id
                    quantity
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.data.quantity).to.be.eq(20)
        });

        it('adjust quantity down', async () => {
            const user = await UserModel.create({ name: 'job' });
            authContext(user);

            const ins = await repo.builderCreate({
                name: 'milk-1',
                content: 'vina milk',
                branches: [
                    {
                        code: 'milk-1',
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ],
                        inventory: {
                            quantity: 10
                        }
                    }
                ]
            });

            const product = await repo.query()
                                      .pushCriteria(new SelectionCriteria({
                                          columns: ['*'],
                                          preloads: [
                                              {
                                                  name: 'branches',
                                                  columns: ['*']
                                              }
                                          ]
                                      }))
                                      .firstBy(ins.id)

            const res = await client.mutate({
                mutation: `mutation changeQuantity($id: ID_CRYPTO){
                  data: inventory_adjust_quantity(productBranchId: $id, quantity: -10){
                    id
                    quantity
                  }
                }
                `,
                variables: {
                    id: product.branches[0].id
                }
            });

            expect(res.errors).to.be.undefined;
            expect(res.data.data.quantity).to.be.eq(0)
        });
    });
});