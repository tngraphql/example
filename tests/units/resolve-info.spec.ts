/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/29/2020
 * Time: 7:54 AM
 */

import {expect} from 'chai';
import {ResolveInfo} from "../../src/lib/ResolveInfo";
import {graphql} from "graphql";

import {
    buildSchema,
    createUnionType,
    Field,
    ID,
    Info,
    InterfaceType,
    ObjectType,
    Query,
    Resolver
} from "@tngraphql/graphql";
import {DefaultContainer, IOCContainer} from "@tngraphql/graphql/dist/utils/container";
import {Router} from "@tngraphql/route";
import {BuildContext} from "@tngraphql/graphql/dist/schema/build-context";

describe('Resolve Info', () => {
    let info;
    let schema;

    before(async () => {
        @InterfaceType()
        abstract class SampleInterface {
            @Field(type => ID)
            id: string;

            @Field()
            interfaceStringField: string;
        }

        @ObjectType()
        class SampleNestedObject {
            @Field()
            id: string;

            @Field()
            name: string;

            @Field()
            nested: SampleNestedObject;
        }

        @ObjectType({implements: SampleInterface})
        class SampleObject implements SampleInterface {
            interfaceStringField: string;

            @Field(type => ID)
            id: string;

            @Field()
            name: string;

            @Field()
            nested: SampleNestedObject;
        }

        const unionType = createUnionType({
            name: 'sampleUnion',
            types: [SampleObject]
        })

        @Resolver(of => SampleObject)
        class SampleResolver {
            @Query()
            sampleQuery(@Info() data): SampleObject {
                info = data;
                return {} as SampleObject;
            }

            @Query(returns => unionType)
            unionQuery(@Info() data): typeof unionType {
                info = data;

                return {} as typeof unionType;
            }

            @Query()
            stringQuery(@Info() data): string {
                info = data;
                return '';
            }
        }


        BuildContext.routeStore = undefined;
        const router = new Router();
        const container = new DefaultContainer();
        container.bind('SampleResolver', SampleResolver);
        router.query('sampleQuery', 'SampleResolver.sampleQuery');
        router.query('unionQuery', 'SampleResolver.unionQuery');
        router.query('stringQuery', 'SampleResolver.stringQuery');

        schema = await buildSchema({
            router,
            container
        });
    })

    it('check empty', async () => {
        const empty = ResolveInfo.prototype['empty'];
        expect(empty(void (0))).to.be.true;
        expect(empty(null)).to.be.true;
        expect(empty(false)).to.be.true;
        expect(empty(0)).to.be.true;
        expect(empty('')).to.be.true;
        expect(empty('0')).to.be.true;
        expect(empty({})).to.be.true;
        expect(empty(123)).to.be.false;
    });

    it('string query', async () => {
        const result = await graphql(schema, `{stringQuery}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({})
    });

    it('should get field without error, using fragment', async () => {
        const result = await graphql(schema, `
        fragment FragmentSimple on SampleObject {
            id
        }
        {
            sampleQuery{
                ... FragmentSimple
            }
        }`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({id: true});
    });

    it('should get field without error', async () => {
        const result = await graphql(schema, `{sampleQuery{id}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({ id: true });
    });

    it('should get field interface field', async () => {
        const result = await graphql(schema, `{sampleQuery{interfaceStringField}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({
            interfaceStringField: true
        });
    });

    it('should correctly get field', async () => {
        const result = await graphql(schema, `{sampleQuery{id name}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({id: true, name: true});
    });

    it('should correctly get field nested', async () => {
        const result = await graphql(schema, `{sampleQuery{id name nested{id}}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({id: true, name: true, nested: {id: true}});
    });

    it('should correctly get field nested to nested', async () => {
        const result = await graphql(schema, `{sampleQuery{id name nested{id nested{id}}}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({id: true, name: true, nested: {id: true, nested: {id: true}}});
    });

    it('should correctly get field union type', async () => {
        const result = await graphql(schema, `{unionQuery{
            __typename
            ... on SampleObject {
                id
                nested {
                    id
                    nested {
                        id
                        nested {
                            id
                        }
                    }
                }
              }
        }}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(4)).to.deep.eq({"id":true,"nested":{"id":true,"nested":{"id":true,"nested":{"id":true}}},"__typename":true})
    });

    it('should correctly get field depth', async () => {
        const result = await graphql(schema, `{sampleQuery{id name nested{id nested{id}}}}`);
        const rinfo = new ResolveInfo(info);
        expect(rinfo.getFieldSelection(1)).to.deep.eq({id: true, name: true, nested: {id: true, nested: true}});
    });
});