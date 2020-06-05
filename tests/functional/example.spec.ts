import {ApolloServerTestClient} from "apollo-server-testing/dist/createTestClient";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/2/2020
 * Time: 8:05 AM
 */
import {expect} from 'chai';
import {createTestClient} from "apollo-server-testing";
import {createServer, resetTables, seedDB} from "../helpers";
import {Mail} from "@tngraphql/mail/dist/src/Mail";
import {TestEmail} from "../../src/app/Mail/TestEmail";
import {Event} from "@tngraphql/illuminate/dist/Support/Facades";
import {MessageSending} from "@tngraphql/mail/dist/src/Events";
const { gql } = require('apollo-server');

describe('Example', () => {
    let client: ApolloServerTestClient;

    before(async () => {
        const server: any = await createServer();
        client = createTestClient(server);
        await seedDB();
    });

    after(async () => {
        await resetTables();
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

    it('Send Mail', async () => {
        // Mail.fake();
        // Event.on(MessageSending, data => {
        //     console.log(JSON.stringify(data));
        // })
        await Mail.send(new TestEmail());
    });
});