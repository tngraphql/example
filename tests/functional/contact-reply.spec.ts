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
import {CONTACTREPLY_LIST_QUERY, CONTACTREPLY_QUERY} from "./gql/contact-reply-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import ContactReplyModel from "../../src/app/Features/Contact/ContactReplyModel";
import ContactModel from "../../src/app/Features/Contact/ContactModel";

describe('contactReply Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        const contact = await Factory.model('App/Features/Contact/ContactModel').create();
        const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3, {
            id: contact.id
        });
        await authContext(await UserModel.first());
    });

    afterEach(async () => {
        await resetTables();
        await Factory.model('App/Features/Contact/ContactModel').reset();
        await Factory.model('App/Features/Contact/ContactReplyModel').reset();
        authContext(null);
    });

    describe('contactReply Http | Index', () => {
        describe('contactReply Http | index | base', () => {
            it('should response first contactReply', async () => {
                const contactReply = await ContactReplyModel.first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            });

            it('should response first contactReply using order by', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            });

            it('should response first contactReply when authentication', async () => {
                const contactReply = await ContactReplyModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: CONTACTREPLY_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": contactReply.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            })
        
            it('should filter message without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "filter": {
                            "field": "message",
                            "value": contactReply.message,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.message).to.eq(contactReply.message);
            })
        
            it('should filter contactId without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "filter": {
                            "field": "contactId",
                            "value": contactReply.contactId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.contactId).to.eq(contactReply.contactId);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.id).to.eq(contactReply.id);
            })
        
            it('should sort by desc message without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('message', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "message": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.message).to.eq(contactReply.message);
            })

            it('should sort by asc message without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('message', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "message": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.message).to.eq(contactReply.message);
            })
        
            it('should sort by desc contactId without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('contactId', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "contactId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.contactId).to.eq(contactReply.contactId);
            })

            it('should sort by asc contactId without error', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(3);

                const contactReply = await ContactReplyModel.query().orderBy('contactId', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACTREPLY_QUERY,
                    variables: {
                        "sortBy": [{
                            "contactId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReply.id).to.eq(contactReply.id);
                expect(res.data.contactReply.contactId).to.eq(contactReply.contactId);
            })
        
        });
    });

    describe('contactReply Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('contactReply Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['code']).to.eq('E_AUTHENTICATION');
            });

            it('should reponse list contactReply', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);
                const contactReplies = await ContactReplyModel.query();

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data).to.length(contactReplies.length);
                expect(res.data.contactReplies.total).to.eq(contactReplies.length);
                expect(res.data.contactReplies.currentPage).to.eq(1);
            });

            it('should response contactReply paginate', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);
                const contactReplies = await ContactReplyModel.query();

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data).to.length(2)
                expect(res.data.contactReplies.perPage).to.eq(2)
                expect(res.data.contactReplies.total).to.eq(contactReplies.length)
                expect(res.data.contactReplies.currentPage).to.eq(2)
            });
        });

        describe('contactReply Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": contactReply.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data[0].id).to.eq(contactReply.id)
                expect(res.data.contactReplies.data[0].id).to.eq(contactReply.id)
            });
        
            it('should filter message without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "message",
                            "value": contactReply.message,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data[0].id).to.eq(contactReply.id)
                expect(res.data.contactReplies.data[0].message).to.eq(contactReply.message)
            });
        
            it('should filter contactId without error', async () => {
                const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "contactId",
                            "value": contactReply.contactId,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data[0].id).to.eq(contactReply.id)
                expect(res.data.contactReplies.data[0].contactId).to.eq(contactReply.contactId)
            });
        
        });

        describe('contactReply Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by message desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('message', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "message": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by message asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('message', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "message": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by contactId desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('contactId', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "contactId": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by contactId asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactReplyModel').createMany(5);

                const data = await ContactReplyModel.query().orderBy('contactId', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACTREPLY_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "contactId": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contactReplies.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('contactReply Http | create', () => {
        describe('contactReply Http | create', () => {
            it('create contactReply', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.mutate({
                    mutation: `mutation contactReplyCreate($message: String, $contactId: String) {
                      contactReplyCreate(message: $message, contactId: $contactId) {
                        id
                      }
                    }`,
                    variables: {
                        message: 'nguyen',
                        contactId: contact.id
                    }
                });

                const contactUpdate = await ContactModel.findBy('id', contact.id);

                expect(res.errors).to.be.undefined;
                expect(contactUpdate.status).to.be.eq('read');
            });
        })
    });

    describe('contactReply Http | update', () => {
        it('update contactReply', async () => {
            const contact = await Factory.model('App/Features/Contact/ContactModel').create();
            const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create();

            const res = await client.mutate({
                mutation: `mutation contactReplyUpdate(
                  $id: ID_CRYPTO
                  $message: String
                  $contactId: ID_CRYPTO
                ) {
                  contactReplyUpdate(id: $id, message: $message, contactId: $contactId) {
                    id
                  }
                }
                `,
                variables: {
                    id: contactReply.id,
                    message: 'message',
                    contactId: contact.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('contactReply Http | delete', () => {
        it('delete contactReply', async () => {
            const contact = await Factory.model('App/Features/Contact/ContactModel').create();
            const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create({
                id: contact.id
            });

            const res = await client.mutate({
                mutation: `mutation contactReplyDelete($id: [ID_CRYPTO]) {
                  contactReplyDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: contactReply.id
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

});