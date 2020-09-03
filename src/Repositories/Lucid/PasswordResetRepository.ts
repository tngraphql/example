/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:23 AM
 */
import { BaseRepository } from './BaseRepository';
import { Service } from '@tngraphql/illuminate';
import { ResolveLang } from '../../decorators/ResolveLang';
import PasswordResetModel from '../../app/Models/PasswordResetModel';
import { ConfigOptions } from '../../lib/ConfigOptions';
import { Str } from '../../lib/Str';
import { Mail } from '@tngraphql/mail/dist/src/Mail';
import { ResetPassword } from '../../app/Mail/ResetPassword';
import { DateTime } from 'luxon';
import { Config } from '../../lib/Config';

@Service()
export class PasswordResetRepository extends BaseRepository<PasswordResetModel> {
    @ResolveLang()
    public lang: any;

    public model(): typeof PasswordResetModel {
        return PasswordResetModel;
    }

    public async forgot(data) {
        return this.transaction(async () => {
            const created = await this.create(data);

            const home = await ConfigOptions.getOption('home');

            const actionUrl = Str.trimUrl(home) + '/password/reset/' + created.token;

            await Mail.to(created).send(new ResetPassword({ actionUrl }));

            return created;
        });
    }

    public async create(data) {
        return this.transaction(async () => {
            await this.delete(data.email);

            const instance = await super.create(this.getPayload(data.email, await this.createToken()));
            instance.email = data.email;
            return instance;
        });
    }

    public getPayload(email, token) {
        return {
            email,
            token
        };
    }

    public createToken() {
        return Str.radomString(40);
    }

    public async exists(user, token) {
        const record = await this.query().firstBy(user.email, 'email');

        return record && ! await this.tokenExpired(record.createdAt) && this.check(token, record.token);
    }

    public check(token, oldToken) {
        return token === oldToken;
    }

    /**
     * @param createdAt
     * @return boolean
     */
    public tokenExpired(createdAt: DateTime) {
        const expires = 60 * 1000 * Number(Config.get('auth.passwords.expire', 5));

        return createdAt.plus(expires).diff(DateTime.local()).valueOf() < 0;
    }

    public async reset(data, callback) {
        const tokenExists = await this.exists(data, data.token);

        if ( ! tokenExists ) {
            throw new Error('Token is invalid.');
        }

        await callback();

        return await this.delete(data.email);
    }

    public async delete(email, attribute = 'email') {
        return super.delete(email, attribute);
    }
}