/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 4:06 PM
 */

import { createTestClient } from 'apollo-server-testing';
import { authContext, createServer, resetTables, seedDB } from '../helpers';

const { gql } = require('apollo-server');
import { expect } from 'chai';
import { ApolloServerTestClient } from '../../src/Contracts/ApolloTestClient';

describe('permission Http', () => {
    let client: ApolloServerTestClient;
    let server: any

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(null);
    });

    afterEach(async () => {
        await resetTables();
        authContext(null);
    });

    describe('permission Http | list', () => {
        describe('permission Http | list | base', () => {
            it('should not be response error when is not login', async () => {
                const res = await client.query({
                    query: `query permissions {
                      permissions {
                        id
                        name
                        displayName
                      }
                    }
                    `
                });
                expect(res.errors).to.be.undefined;
            });

            it('should not be response error when is login', async () => {
                const res = await client.query({
                    query: `query permissions {
                      permissions {
                        id
                        name
                        displayName
                      }
                    }
                    `
                });
                expect(res.errors).to.be.undefined;
            });
        });
    });

});