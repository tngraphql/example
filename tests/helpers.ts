/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/20/2020
 * Time: 1:35 PM
 */

import {QueryClientContract} from "@tngraphql/lucid/build/src/Contracts/Database/QueryClientContract";
import {Application} from "@tngraphql/illuminate";
import {Kernel} from "../src/app/GraphQL/Kernel";
import {ApolloServer} from "apollo-server";
import {GraphQLExceptions} from "../src/app/Exceptions/GraphQLExceptions";
import {Ace} from "@tngraphql/illuminate/dist/Support/Facades/Ace";

export async function setup(destroyDb: boolean = true) {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await Ace.call('migration:run', []);

    // const hasUsersTable = await db.schema.hasTable('users');
    // if (!hasUsersTable) {
    //     await db.schema.createTable('users', (table) => {
    //         table.increments()
    //         table.string('name', 121);
    //         table.string('password', 255);
    //         table.timestamps(true);
    //     });
    //     await db.table('users').insert({
    //         name: 'nguyen',
    //         password: Application.getInstance().use('hash').make('123456')
    //     });
    // }

    const hasProfilesTable = await db.schema.hasTable('profiles');
    if (!hasProfilesTable) {
        await db.schema.createTable('profiles', (table) => {
            table.increments()
            table.string('name', 121);
            table.string('user_id', 121);
            table.timestamps(true);
        });
        await db.table('profiles').insert({
            name: 'nguyen',
            user_id: '1'
        });
    }

    if ( destroyDb ) {
        await database.manager.closeAll();
    }
}

export const setupDB = setup;

/**
 * Does cleanup removes database
 */
export async function cleanup(customTables?: string[]) {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await Ace.call('migration:reset', []);

    if ( customTables ) {
        await Promise.all(customTables.map((table) => db.schema.dropTableIfExists(table)))
        await database.manager.closeAll();
        return
    }

    await db.schema.dropTableIfExists('users')
    await db.schema.dropTableIfExists('profiles')

    await database.manager.closeAll();
}

/**
 * Reset database tables
 */
export async function resetTables() {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await db.truncate('users');
    await db.truncate('profiles');
    await database.manager.closeAll();
}

export async function createServer(context = () => {}): Promise<ApolloServer> {
    const app = Application.getInstance<Application>();
    const kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

    const ctxNew: any = await context();

    return new ApolloServer({
        schema: await kernel.complie(),
        formatError: GraphQLExceptions.handle.bind(app),
        context: ctx => {
            return {
                ...ctx,
                ...ctxNew
            }
        }
    });
}