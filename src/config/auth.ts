/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 3/29/2020
 * Time: 10:21 AM
 */

import { UserModel } from '../app/UserModel';

export = {
    /**
     * Expired time token is in `minute`.
     */
    expired: 60,

    defaults: {
        guard: 'api',
        provider: 'users'
    },
    guards: {
        api: {
            driver: 'jwt'
        }
    },
    providers: {
        users: {
            driver: 'lucid',
            model: UserModel,
            table: '',
        }
    },
    /*passwords: {
        users: {
            provider: '',
            table: '',
            expire: '',
        }
    },

    public_key: '',
    private_key: ''*/
}
