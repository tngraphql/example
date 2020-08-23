/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/17/2020
 * Time: 8:37 AM
 */
import {ApolloServerTestClient} from "../../../src/Contracts/ApolloTestClient";
import {createTestClient} from "apollo-server-testing";
import {authContext, createServer, resetTables, seedDB} from "../../helpers";
const { gql } = require('apollo-server');
import {expect} from "chai";
import {DEPH_LIMIT_PAGE} from "../gql/deph-limit.gql";
import {Application} from "@tngraphql/illuminate";

describe('deph limit', () => {
    let client: ApolloServerTestClient;
    let server: any;
    let app: Application;
    let config;
    let defaultDepthLimit;

    before(async () => {
        app = Application.getInstance<Application>()
        config = app.config.get('app');
        defaultDepthLimit = config.depthLimit;

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
        config.depthLimit = defaultDepthLimit;
    });

    describe('panginate', () => {
        it('should throw error max deph', async () => {
            config.depthLimit = 2;

            const res = await client.query({
                query: `
query menus {
  menus {
    from
    data {
      id
      name
      alias
      menuItems {
        id
        title
        menu {
          id
          name
        }
      }
    }
  }
}`
            });

            expect(res.errors).to.be.not.undefined;
            expect(res.errors[0].message).to.be.eq("'menus' exceeds maximum operation depth of " + config.depthLimit);
        });

        it('should success query', async () => {
            config.depthLimit = 2;

            const res = await client.query({
                query: `
query menus {
  menus {
    from
    data {
      id
      name
      alias
      menuItems {
        id
        title
      }
    }
  }
}`
            });

            expect(res.errors).to.be.undefined;
        });
    });

    describe('default', () => {
        it('should throw error max deph', async () => {
            config.depthLimit = 2;

            const res = await client.query({
                query: `
query menus {
  menu {
      id
      name
      alias
      menuItems {
        id
        title
        menu {
          id
          name
        }
      }
  }
}`
            });

            expect(res.errors).to.be.not.undefined;
            expect(res.errors[0].message).to.be.eq("'menus' exceeds maximum operation depth of " + config.depthLimit);
        });

        it('should success query', async () => {
            config.depthLimit = 2;

            const res = await client.query({
                query: `
query menus {
  menu {
      id
      name
      alias
      menuItems {
        id
        title
      }
  }
}`
            });

            expect(res.errors).to.be.undefined;
        });
    });
});