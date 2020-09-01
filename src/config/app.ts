/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/11/2020
 * Time: 12:51 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { AceServiceProvider } from '@tngraphql/illuminate/dist/Foundation/Providers/AceServiceProvider';
import { RouteServiceProvider } from '../app/Providers/RouteServiceProvider';
import { ValidatorServiceProvider } from '@tngraphql/illuminate/dist/Foundation/Validate/ValidatorServiceProvider';
import { DatabaseServiceProvider } from '@tngraphql/illuminate/dist/Database/DatabaseServiceProvider';
import { AppServiceProvider } from '../app/Providers/AppServiceProvider';
import { TranslationServiceProvider } from '@tngraphql/illuminate/dist/Translation/TranslationServiceProvider';
import {AuthServiceProvider} from '@tngraphql/auth';
import {HashServiceProvider} from "@tngraphql/illuminate/dist/Hashing/HashServiceProvider";
import {GuardServiceProvider} from "@tngraphql/guard/dist/src/GuardServiceProvider";
import {GateServiceProvider} from "../app/Providers/GateServiceProvider";
import {MailServiceProvider} from "@tngraphql/mail";
import {Env} from "@tngraphql/illuminate/dist/Support/Env";
import {ViewServiceProvider} from "../app/Providers/ViewServiceProvider";

const app = {

    /**
     * --------------------------------------------------------------------------
     * Application Name
     * --------------------------------------------------------------------------
     *
     *
     */

    name: Env.get('APP_NAME', 'TnGraphQL'),

    /**
     * --------------------------------------------------------------------------
     * Application Environment
     * --------------------------------------------------------------------------
     *
     * This value determines the "environment" your application is currently
     * running in. This may determine how you prefer to configure various
     * services the application utilizes. Set this in your ".env" file.
     */

    env: Env.get('APP_ENV', 'production'),

    /**
     * --------------------------------------------------------------------------
     * Application URL
     * --------------------------------------------------------------------------
     */
    url: Env.get('APP_URL', ''),

    /**
     * --------------------------------------------------------------------------
     * Application Timezone
     * --------------------------------------------------------------------------
     *
     *
     */

    timezone: 'Asia/Ho_Chi_Minh',

    /**
     * --------------------------------------------------------------------------
     * Encryption Key
     * --------------------------------------------------------------------------
     *
     * This key is used by the Illuminate encrypter service and should be set
     * to a random, 32 character string, otherwise these encrypted strings
     * will not be safe. Please do this before deploying an application!
     */

    key: Env.get('APP_KEY'),

    cipher: 'AES-256-CBC',

    /**
     * --------------------------------------------------------------------------
     * Autoloaded Service Providers
     * --------------------------------------------------------------------------
     *
     * The service providers listed here will be automatically loaded on the
     * request to your application. Feel free to add your own services to
     * this array to grant expanded functionality to your applications.
     */

    providers: [
        AceServiceProvider,
        DatabaseServiceProvider,
        ValidatorServiceProvider,
        TranslationServiceProvider,
        AuthServiceProvider,
        HashServiceProvider,
        GuardServiceProvider,
        GateServiceProvider,
        MailServiceProvider,

        AppServiceProvider,
        RouteServiceProvider,
        ViewServiceProvider
    ],


    depthLimit: Env.get('DEPTH_LIMIT', 6),
}

export = app;
