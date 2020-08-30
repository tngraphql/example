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
import {CONTACT_LIST_QUERY, CONTACT_QUERY} from "./gql/contact-gql";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";
import ContactModel from "../../src/app/Features/Contact/ContactModel";
import {Mail} from "@tngraphql/mail/dist/src/Mail";
import ContactReplyModel from "../../src/app/Features/Contact/ContactReplyModel";

Mail.fake();

describe('contact Http', () => {
    let client: ApolloServerTestClient;
    let server: any;

    before(async () => {
        server = await createServer();
        client = createTestClient(server) as ApolloServerTestClient;
    });

    beforeEach(async () => {
        await seedDB();
        authContext(await UserModel.first());
        await Factory.model('App/Features/Contact/ContactModel').createMany(3);
    });

    afterEach(async () => {
        await resetTables();
        await Factory.model('App/Features/Contact/ContactModel').reset();
        await authContext(null);
    });

    describe('contact Http | Index', () => {
        describe('contact Http | index | base', () => {
            it('should response first contact', async () => {
                const contact = await ContactModel.first();

                const res = await client.query({
                    query: CONTACT_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
            });

            it('should response first contact using order by', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": {
                            "id": "DESC"
                        }
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
            });

            it('should response first contact when authentication', async () => {
                const contact = await ContactModel.first();

                authContext(await UserModel.first());

                const res = await client.query({
                    query: CONTACT_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
            });
        });

        describe('User Http | index | filter', () => {
        
            it('should filter id without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": contact.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.id).to.eq(contact.id);
            })
        
            it('should filter name without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": contact.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.name).to.eq(contact.name);
            })
        
            it('should filter email without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "email",
                            "value": contact.email,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.email).to.eq(contact.email);
            })
        
            it('should filter phone without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "phone",
                            "value": contact.phone,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.phone).to.eq(contact.phone);
            })
        
            it('should filter address without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "address",
                            "value": contact.address,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.address).to.eq(contact.address);
            })
        
            it('should filter content without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "content",
                            "value": contact.content,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.content).to.eq(contact.content);
            })
        
            it('should filter subject without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "subject",
                            "value": contact.subject,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.subject).to.eq(contact.subject);
            })
        
            it('should filter status without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create({status: 'read'});

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": contact.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.status).to.eq(contact.status);
            })
        
        });

        describe('User Http | index | sortBy', () => {
        
            it('should sort by desc id without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('id', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.id).to.eq(contact.id);
            })

            it('should sort by asc id without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('id', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.id).to.eq(contact.id);
            })
        
            it('should sort by desc name without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('name', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.name).to.eq(contact.name);
            })

            it('should sort by asc name without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('name', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.name).to.eq(contact.name);
            })
        
            it('should sort by desc email without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('email', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "email": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.email).to.eq(contact.email);
            })

            it('should sort by asc email without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('email', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "email": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.email).to.eq(contact.email);
            })
        
            it('should sort by desc phone without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('phone', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "phone": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.phone).to.eq(contact.phone);
            })

            it('should sort by asc phone without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('phone', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "phone": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.phone).to.eq(contact.phone);
            })
        
            it('should sort by desc address without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('address', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "address": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.address).to.eq(contact.address);
            })

            it('should sort by asc address without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('address', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "address": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.address).to.eq(contact.address);
            })
        
            it('should sort by desc content without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('content', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.content).to.eq(contact.content);
            })

            it('should sort by asc content without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('content', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.content).to.eq(contact.content);
            })
        
            it('should sort by desc subject without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('subject', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "subject": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.subject).to.eq(contact.subject);
            })

            it('should sort by asc subject without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('subject', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "subject": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.subject).to.eq(contact.subject);
            })
        
            it('should sort by desc status without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('status', SortEnumType.DESC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.status).to.eq(contact.status);
            })

            it('should sort by asc status without error', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(3);

                const contact = await ContactModel.query().orderBy('status', SortEnumType.ASC).first();

                const res = await client.query({
                    query: CONTACT_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contact.id).to.eq(contact.id);
                expect(res.data.contact.status).to.eq(contact.status);
            })
        
        });
    });

    describe('contact Http | list', () => {
        beforeEach(async () => {
            authContext(await UserModel.first());
        });

        describe('contact Http | list | base', () => {
            it('should response error when is not login', async () => {
                authContext(null);
                const res = await client.query({
                    query: CONTACT_LIST_QUERY
                });
                expect(res.errors).to.not.undefined;
                expect(res.errors[0]['type']).to.eq('AuthException');
            });

            it('should reponse list contact', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);
                const contacts = await ContactModel.query();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data).to.length(contacts.length);
                expect(res.data.contacts.total).to.eq(contacts.length);
                expect(res.data.contacts.currentPage).to.eq(1);
            });

            it('should response contact paginate', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);
                const contacts = await ContactModel.query();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        page: 2,
                        limit: 2
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data).to.length(2)
                expect(res.data.contacts.perPage).to.eq(2)
                expect(res.data.contacts.total).to.eq(contacts.length)
                expect(res.data.contacts.currentPage).to.eq(2)
            });
        });

        describe('contact Http | list | filter', () => {
        
            it('should filter id without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "id",
                            "value": contact.id,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
            });
        
            it('should filter name without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "name",
                            "value": contact.name,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].name).to.eq(contact.name)
            });
        
            it('should filter email without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "email",
                            "value": contact.email,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].email).to.eq(contact.email)
            });
        
            it('should filter phone without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "phone",
                            "value": contact.phone,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].phone).to.eq(contact.phone)
            });
        
            it('should filter address without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "address",
                            "value": contact.address,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].address).to.eq(contact.address)
            });
        
            it('should filter content without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "content",
                            "value": contact.content,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].content).to.eq(contact.content)
            });
        
            it('should filter subject without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create();

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "subject",
                            "value": contact.subject,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].subject).to.eq(contact.subject)
            });
        
            it('should filter status without error', async () => {
                const contact = await Factory.model('App/Features/Contact/ContactModel').create({status: 'read'});

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "filter": {
                            "field": "status",
                            "value": contact.status,
                            "operator": "eq"
                        }
                    }
                });
                expect(res.errors).to.undefined;
                expect(res.data.contacts.data[0].id).to.eq(contact.id)
                expect(res.data.contacts.data[0].status).to.eq(contact.status)
            });
        
        });

        describe('contact Http | list | sortBy', () => {
        
            it('should order by id desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('id', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by id asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('id', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "id": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by name desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('name', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by name asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('name', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "name": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by email desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('email', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "email": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by email asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('email', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "email": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by phone desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('phone', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "phone": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by phone asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('phone', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "phone": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by address desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('address', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "address": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by address asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('address', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "address": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by content desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('content', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by content asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('content', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "content": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by subject desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('subject', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "subject": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by subject asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('subject', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "subject": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
            it('should order by status desc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('status', SortEnumType.DESC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.DESC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });

            it('should order by status asc when sortBy as array', async () => {
                await Factory.model('App/Features/Contact/ContactModel').createMany(5);

                const data = await ContactModel.query().orderBy('status', SortEnumType.ASC)

                const res = await client.query({
                    query: CONTACT_LIST_QUERY,
                    variables: {
                        "sortBy": [{
                            "status": SortEnumType.ASC
                        }]
                    }
                });

                expect(res.errors).to.undefined;
                expect(res.data.contacts.data.map(x=>x.id)).to.deep.eq(data.map(x => x.id));
            });
        
        });
    });

    describe('contact Http | create', () => {
        describe('contact Http | create', () => {
            it('create contact', async () => {
                await authContext(null);

                const res = await client.mutate({
                    mutation: `mutation contactCreate(
                      $name: String
                      $email: String
                      $phone: String
                      $address: String
                      $content: String
                      $subject: String
                    ) {
                      contactCreate(
                        name: $name
                        email: $email
                        phone: $phone
                        address: $address
                        content: $content
                        subject: $subject
                      ) {
                        id
                      }
                    }`,
                    variables: {
                        name: 'nguyen',
                        email: 'nguyenpl117@gmail.com',
                        content: 'plan text',
                    }
                });

                expect(res.errors).to.be.undefined;
            });
        })
    });

    describe('contact Http | update', () => {
        it('update contact', async () => {
            const contact = await Factory.model('App/Features/Contact/ContactModel').create();

            const res = await client.mutate({
                mutation: `mutation contactUpdate($id: ID_CRYPTO, $status: String) {
                  contactUpdate(id: $id, status: $status) {
                    id
                  }
                }`,
                variables: {
                    id: contact.id,
                    status: 'read'
                }
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('contact Http | delete', () => {
        it('delete contact', async () => {
            const contact = await Factory.model('App/Features/Contact/ContactModel').create();
            const contactReply = await Factory.model('App/Features/Contact/ContactReplyModel').create({
                id: contact.id
            });

            const res = await client.mutate({
                mutation: `mutation contactDelete($id: [ID_CRYPTO]) {
                  contactDelete(id: $id) {
                    status
                    message
                    data
                  }
                }
                `,
                variables: {
                    id: contact.id
                }
            });

            expect(res.errors).to.be.undefined;
            expect(await ContactReplyModel.findBy('id', contactReply.id)).to.be.null;
        });
    });
});