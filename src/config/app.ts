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
import { Config } from 'apollo-server';
import { AppServiceProvider } from '../app/Providers/AppServiceProvider';
import { TranslationServiceProvider } from '@tngraphql/illuminate/dist/Translation/TranslationServiceProvider';
import {AuthServiceProvider} from '@tngraphql/auth';
import {HashServiceProvider} from "@tngraphql/illuminate/dist/Hashing/HashServiceProvider";
import {GuardServiceProvider} from "@tngraphql/guard/dist/src/GuardServiceProvider";
import {GateServiceProvider} from "../app/Providers/GateServiceProvider";
import {MailServiceProvider} from "@tngraphql/mail";
import {Env} from "@tngraphql/illuminate/dist/Support/Env";

type AppConfig = Config | any;

const app: AppConfig = {
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
    ],
    playground: {
        version: '1.7.10'
    },
    introspection: true,
    depthLimit: Env.get('DEPTH_LIMIT', 6)
    // formatError
}

export = app;
