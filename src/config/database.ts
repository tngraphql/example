/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { join } from 'path'
import { Env } from '@tngraphql/illuminate/dist/Support/Env';

const databaseConfig = {
    /*
    |--------------------------------------------------------------------------
    | Connection
    |--------------------------------------------------------------------------
    |
    | The primary connection for making database gql across the application
    | You can use any key from the `connections` object defined in this same
    | file.
    |
    */
    connection: Env.get('DB', 'mysql') as string,

    connections: {
        /*
        |--------------------------------------------------------------------------
        | Sqlite
        |--------------------------------------------------------------------------
        |
        | Configuration for the Sqlite database.  Make sure to install the driver
        | from npm when using this connection
        |
        | npm i sqlite3
        |
        */
        sqlite: {
            client: 'sqlite',
            connection: {
                filename: join(process.cwd(), 'db.sqlite'),
            },
            useNullAsDefault: true,
            healthCheck: false,
            debug: Env.get('LOG_LEVEL') === 'trace',
        },

        /*
        |--------------------------------------------------------------------------
        | Mysql config
        |--------------------------------------------------------------------------
        |
        | Configuration for Mysql database. Make sure to install the driver
        | from npm when using this connection
        |
        | npm i mysql
        |
        */
        mysql: {
            client: 'mysql',
            connection: {
                host: Env.get('MYSQL_HOST', '127.0.0.1') as string,
                port: Number(Env.get('MYSQL_PORT', 3306)),
                user: Env.get('MYSQL_USER', 'root') as string,
                password: Env.get('MYSQL_PASSWORD', '') as string,
                database: Env.get('DB_NAME', 'lucid') as string,
            },
            healthCheck: false,
            debug: Env.get('LOG_LEVEL') === 'trace',
        },

        /*
        |--------------------------------------------------------------------------
        | PostgreSQL config
        |--------------------------------------------------------------------------
        |
        | Configuration for PostgreSQL database. Make sure to install the driver
        | from npm when using this connection
        |
        | npm i pg
        |
        */
        pg: {
            client: 'pg',
            connection: {
                host: Env.get('DB_HOST', '127.0.0.1') as string,
                port: Number(Env.get('DB_PORT', 5432)),
                user: Env.get('DB_USER', 'lucid') as string,
                password: Env.get('DB_PASSWORD', 'lucid') as string,
                database: Env.get('DB_NAME', 'lucid') as string,
            },
            healthCheck: false,
            debug: Env.get('LOG_LEVEL') === 'trace',
        },

        mssql: {
            client: 'mssql',
            connection: {
                user: Env.get('MSSQL_USER'),
                server: Env.get('MSSQL_SERVER'),
                password: Env.get('MSSQL_PASSWORD'),
                database: 'master',
            },
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Orm Configuration
    |--------------------------------------------------------------------------
    |
    | Following are some of the configuration options to tweak the conventional
    | settings of the ORM. For example:
    |
    | - Define a custom function to compute the default table name for a given model.
    | - Or define a custom function to compute the primary key for a given model.
    |
    */
    orm: {},
}

export default databaseConfig
