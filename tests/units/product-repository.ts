/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/14/2020
 * Time: 10:47 AM
 */

import {resetTables, seedDB} from "../helpers";
import {Application} from "@tngraphql/illuminate";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {UserModel} from "../../src/app/UserModel";
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
import {ProductMasterRepository} from "../../src/app/Features/Product/Repositories/ProductMasterRepository";
import {expect} from 'chai';
import {ProductMasterKindEnumType} from "../../src/app/Features/Product/Types/Product/ProductMasterKindEnumType";
import {SelectionCriteria} from "../../src/Repositories/Criteria/SelectionCriteria";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";

describe('Product Repository', () => {
    describe('Create', () => {
        let app: Application;
        let context;
        let repo: ProductMasterRepository;

        before(async () => {
            app = Application.getInstance<Application>()
            context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
            repo = await app.make(ProductMasterRepository, context);
        });

        beforeEach(async () => {
            await seedDB();
            await Factory.model('App/Features/Product/Models/ProductTypeModel').create();
            await Factory.model('App/Features/Product/Models/ProductVendorModel').create();
        });

        afterEach(async () => {
            await resetTables();
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
            await Factory.model('App/Models/MediaModel').reset();
        });

        it('create a product single', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.single)
            expect(product.name).to.be.eq('milk')
            expect(product.branches[0].fullname).to.be.eq('milk')
        });

        it('create product single have category', async () => {
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                categories: [category.id],
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'categories',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.categories[0].id).to.be.eq(category.id);
        });

        it('create product single have multiple category', async () => {
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();
            const category2 = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                categories: [category.id, category2.id],
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'categories',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.categories[0].id).to.be.eq(category.id);
            expect(product.categories[1].id).to.be.eq(category2.id);
        });

        it('create product single have tag', async () => {
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                categories: [category.id],
                tags: ['milk'],
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'tags',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.tags[0].name).to.be.eq('milk');
        });

        it('create product single have multiple tag', async () => {
            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                categories: [category.id],
                tags: ['milk', 'canxi'],
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'tags',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.tags[0].name).to.be.eq('milk');
            expect(product.tags[1].name).to.be.eq('canxi');
        });

        it('create product single have vendor', async () => {
            const vendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                productVendorId: vendor.id,
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'vendor',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.vendor.name).to.be.eq(vendor.name);
        });

        it('create product single have thumbnail', async () => {
            const thumb = await Factory.model('App/Models/MediaModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                thumbnailId: thumb.id,
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'thumbnail',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.thumbnail.id).to.be.eq(thumb.id);
        });

        it('create product single have meta', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                meta: [
                    {
                        metaKey: '__weight',
                        metaValue: '150'
                    }
                ],
                branches: [
                    {
                        code: "milk"
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
                        },
                        {
                            name: 'meta',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.meta[0].metaKey).to.be.eq('__weight');
            expect(product.meta[0].metaValue).to.be.eq('150');
        });

        it('create product single have images', async () => {
            const thumb = await Factory.model('App/Models/MediaModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk",
                        images: [
                            {
                                image: thumb.guid,
                                thumbnailId: thumb.id
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
                            columns: ['*'],
                            preloads: [
                                {
                                    name: 'images',
                                    columns: ['*']
                                }
                            ]
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.branches[0].images[0].thumbnailId).to.be.eq(thumb.id);
            expect(product.branches[0].images[0].image).to.be.eq(thumb.guid);
        });

        it('create product single have inventory', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk",
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
                            columns: ['*'],
                            preloads: [
                                {
                                    name: 'inventory',
                                    columns: ['*']
                                }
                            ]
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.branches[0].inventory.quantity).to.be.eq(10);
        });

        it('create product single have requiresShipping', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk",
                        requiresShipping: true
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

            expect(product.branches[0].requiresShipping).to.be.true
        });

        it('create a product branch', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk",
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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.name).to.be.eq('milk')
            expect(product.branches[0].fullname).to.be.eq('milk-L')
        });

        it('create product branch multiple attributes', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk",
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            },
                            {
                                groupName: 'color',
                                name: 'grow'
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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.name).to.be.eq('milk')
            expect(product.branches[0].fullname).to.be.eq('milk-L-grow')
        });

        it('create product branch have vendor', async () => {
            const vendor = await Factory.model('App/Features/Product/Models/ProductVendorModel').create();

            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                productVendorId: vendor.id,
                branches: [
                    {
                        code: "milk",
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

            expect(product.branches[0].productVendorId).to.be.eq(vendor.id)
        });

        it('when create product [groupName] be must unique', async () => {
            let err;
            try {
                await repo.builderCreate({
                    name: "milk",
                    content: 'vina milk',
                    branches: [
                        {
                            code: "milk",
                            attributes: [
                                {
                                    groupName: 'size',
                                    name: 'L'
                                },
                                {
                                    groupName: 'size',
                                    name: 'grow'
                                }
                            ]
                        }
                    ]
                });
            } catch (e) {
                err = e;
            }

            expect(err).to.be.not.undefined;
        });
    });

    describe('Update', () => {
        let app: Application;
        let context;
        let repo: ProductMasterRepository;

        before(async () => {
            app = Application.getInstance<Application>()
            context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
            repo = await app.make(ProductMasterRepository, context);
        });
        beforeEach(async () => {
            await seedDB();
            await Factory.model('App/Features/Product/Models/ProductTypeModel').create();
            await Factory.model('App/Features/Product/Models/ProductVendorModel').create();
        });

        afterEach(async () => {
            await resetTables();
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
            await Factory.model('App/Models/MediaModel').reset();
        });

        it('update product', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            const update = await repo.update({
                name: 'foo'
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.single)
            expect(product.name).to.be.eq('foo')
            expect(product.branches[0].fullname).to.be.eq('foo')
        });

        it('update category for product', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            const category = await Factory.model('App/Features/Product/Models/ProductTypeModel').create();

            const update = await repo.update({
                name: 'foo',
                categories: [category.id]
            }, ins.id);

            const product = await repo.query()
                .pushCriteria(new SelectionCriteria({
                    columns: ['*'],
                    preloads: [
                        {
                            name: 'branches',
                            columns: ['*']
                        },
                        {
                            name: 'categories',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.categories[0].id).to.be.eq(category.id);
        });

        it('update tag for product', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            const update = await repo.update({
                name: 'foo',
                tags: ['milk']
            }, ins.id);

            const product = await repo.query()
                .pushCriteria(new SelectionCriteria({
                    columns: ['*'],
                    preloads: [
                        {
                            name: 'branches',
                            columns: ['*']
                        },
                        {
                            name: 'tags',
                            columns: ['*']
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.tags[0].name).to.be.eq('milk');
        });

        it('update images for product', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            const thumb = await Factory.model('App/Models/MediaModel').create();

            const update = await repo.update({
                name: 'foo',
                branches: [
                    {
                        images: [
                            {
                                image: thumb.guid,
                                thumbnailId: thumb.id
                            }
                        ]
                    }
                ]
            }, ins.id);

            const product = await repo.query()
                .pushCriteria(new SelectionCriteria({
                    columns: ['*'],
                    preloads: [
                        {
                            name: 'branches',
                            columns: ['*'],
                            preloads: [
                                {
                                    name: 'images',
                                    columns: ['*']
                                }
                            ]
                        }
                    ]
                }))
                .firstBy(ins.id)

            expect(product.branches[0].images[0].thumbnailId).to.be.eq(thumb.id);
            expect(product.branches[0].images[0].image).to.be.eq(thumb.guid);
        });

        it('update product single to branch should err when not branch', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            let err;

            try {
                await repo.update({
                    name: 'foo',
                    kind: 'branch'
                }, ins.id);
            } catch (e) {
                err = e;
            }

            expect(err).to.be.not.undefined;
        });

        it('update product single to branch should err when not exists attributes', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            let err;

            try {
                await repo.update({
                    name: 'foo',
                    kind: 'branch',
                    branches: [
                        {
                            code: 'foo'
                        }
                    ]
                }, ins.id);
            } catch (e) {
                err = e;
            }

            expect(err).to.be.not.undefined;
        });

        it('canot update to branch when not exists kind', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            await repo.update({
                name: 'foo',
                branches: [
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    }
                ]
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.single)
        });

        it('update product single to branch when have one attribute', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            await repo.update({
                name: 'foo',
                kind: ProductMasterKindEnumType.branch,
                branches: [
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    }
                ]
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.branches[0].fullname).to.be.eq('foo-L')
        });

        it('update product single to branch when have many attributes', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            await repo.update({
                name: 'foo',
                kind: ProductMasterKindEnumType.branch,
                branches: [
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            },
                            {
                                groupName: 'color',
                                name: 'Red'
                            }
                        ]
                    }
                ]
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.branches[0].fullname).to.be.eq('foo-L-Red')
        });

        it('update product single to branch when have many branches', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            await repo.update({
                name: 'foo',
                kind: ProductMasterKindEnumType.branch,
                branches: [
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    },
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'X'
                            }
                        ]
                    }
                ]
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.branches[0].fullname).to.be.eq('foo-L')
            expect(product.branches[1].fullname).to.be.eq('foo-X')
        });

        it('should not update product when attributes not unique', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            let err;
            try {
                await repo.update({
                    name: 'foo',
                    kind: ProductMasterKindEnumType.branch,
                    branches: [
                        {
                            attributes: [
                                {
                                    groupName: 'size',
                                    name: 'L'
                                }
                            ]
                        },
                        {
                            attributes: [
                                {
                                    groupName: 'size',
                                    name: 'L'
                                }
                            ]
                        }
                    ]
                }, ins.id);
            } catch (e) {
                err = e;
            }

            expect(err).to.be.not.undefined;
        });

        it('update single when attribues', async () => {
            const ins = await repo.builderCreate({
                name: "milk",
                content: 'vina milk',
                branches: [
                    {
                        code: "milk"
                    }
                ]
            });

            await repo.update({
                name: 'foo',
                branches: [
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'L'
                            }
                        ]
                    },
                    {
                        attributes: [
                            {
                                groupName: 'size',
                                name: 'X'
                            }
                        ]
                    }
                ]
            }, ins.id);

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

            expect(product.kind).to.be.eq(ProductMasterKindEnumType.branch)
            expect(product.branches[0].fullname).to.be.eq('foo')
            expect(product.branches[1]).to.be.undefined
        });
    });
});