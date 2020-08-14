/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 10:48 AM
 */

import {ApolloServerTestClient} from "../../src/Contracts/ApolloTestClient";
import {authContext, createServer, resetTables, seedDB} from "../helpers";
import {createTestClient} from "apollo-server-testing";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";
import {UserModel} from "../../src/app/UserModel";
import {expect} from "chai";
import {UPDATE_PRODUCT} from "./gql/product-gql";
import {ProductMasterKindEnumType} from "../../src/app/Features/Product/Types/Product/ProductMasterKindEnumType";
import {ProductMasterRepository} from "../../src/app/Features/Product/Repositories/ProductMasterRepository";
import {Application} from "@tngraphql/illuminate";

describe('Product Http | update', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(await UserModel.first());
        await Factory.model('App/Features/Product/Models/ProductMasterModel').createMany(10);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
        await Factory.model('App/Features/Product/Models/ProductMasterModel').reset();
    });

    it('update product single', async () => {
        const product = await Factory.model('App/Features/Product/Models/ProductMasterModel').create();

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
        expect(res.data.productUpdate.data.name).to.be.eq(name);
        expect(res.data.productUpdate.data.kind).to.be.eq(ProductMasterKindEnumType.single);
        expect(res.data.productUpdate.data.branches[0].fullname).to.be.eq(name);
    });

    it('update price product single ', async () => {
        const product = await Factory.model('App/Features/Product/Models/ProductMasterModel').create();

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

function createProduct(data) {
    const app = Application.getInstance<Application>()

    const repo = app.make(ProductMasterRepository);

    return repo.builderCreate(data);
}