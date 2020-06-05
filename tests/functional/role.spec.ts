/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 10:28 AM
 */
import {ApolloServerTestClient} from "apollo-server-testing/dist/createTestClient";
import {authContext, createServer, resetTables, seedDB} from "../helpers";
import {createTestClient} from "apollo-server-testing";
import {UserModel} from "../../src/app/UserModel";

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
    });
});