'use strict'

/*
|--------------------------------------------------------------------------
| UserSeed
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

export class UserSeed {
    public async run() {
        await Factory.model('App/UserModel').create();
    }
}
