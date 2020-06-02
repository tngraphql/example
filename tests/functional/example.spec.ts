import {ApolloServerTestClient} from "apollo-server-testing/dist/createTestClient";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/2/2020
 * Time: 8:05 AM
 */
import {expect} from 'chai';
import {createTestClient} from "apollo-server-testing";
import {cleanup, createServer, setupDB} from "../helpers";
const { gql } = require('apollo-server');

describe('Example', () => {
    let client: ApolloServerTestClient;

    before(async () => {
        const server: any = await createServer();
        client = createTestClient(server);
        await setupDB();
    });

    after(async () => {
        await cleanup();
    });

    it('test', async () => {
        const res = await client.query({
            query: gql`{
          user{
            id
            name
          }
        }`
        });
        expect(res.errors).to.undefined;
        expect(res.data.user.id).to.be.eq(1);
    });

    it('u', async () => {

    });
});