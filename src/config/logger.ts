/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/27/2020
 * Time: 5:37 PM
 */
import { Env } from '@tngraphql/illuminate/dist/Support/Env';

const logger = {
    /*
    |--------------------------------------------------------------------------
    | Application name
    |--------------------------------------------------------------------------
    |
    | The name of the application you want to add to the log. It is recommended
    | to always have app name in every log line.
    |
    */
    name: Env.get('APP_NAME') as string,

    /*
    |--------------------------------------------------------------------------
    | Toggle logger
    |--------------------------------------------------------------------------
    |
    | Enable or disable logger application wide
    |
    */
    enabled: true,

    /*
    |--------------------------------------------------------------------------
    | Logging level
    |--------------------------------------------------------------------------
    |
    | The level from which you want the logger to flush logs. It is recommended
    | to make use of the environment variable, so that you can define log levels
    | at deployment level and not code level.
    |
    */
    level: Env.get('LOG_LEVEL', 'error') as string,

    /*
    |--------------------------------------------------------------------------
    | Pretty print
    |--------------------------------------------------------------------------
    |
    | It is highly advised NOT to use `prettyPrint` in production, since it
    | can have huge impact on performance.
    |
    */
    prettyPrint: Env.get('NODE_ENV') === 'development',
}

export = logger;
