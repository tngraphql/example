/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 7:37 PM
 */
import { UserRepository } from '../../src/Repositories/Lucid/UserRepository';
import { resetTables, seedDB } from '../helpers';
import { Application } from '@tngraphql/illuminate';
import { expect } from 'chai';
import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

describe('User Repository', () => {
    let app: Application;
    before(async () => {
        app = Application.getInstance<Application>()
    });
    beforeEach(async () => {
        await seedDB();
    });

    afterEach(async () => {
        await resetTables();
    });

    it('find all user', async () => {
        const repo = await app.make(UserRepository, { context: { lang: app.use('translator') } } as any);
        await Factory.model('App/UserModel').create();
        expect(await repo.all()).to.be.length(2);
    });
    it('find all user2', async () => {
        const repo = await app.make(UserRepository, { context: { lang: app.use('translator') } } as any);
        await Factory.model('App/UserModel').create();
        expect(await repo.all()).to.be.length(2);
    });
    it('find all user3', async () => {
        const repo = await app.make(UserRepository, { context: { lang: app.use('translator') } } as any);
        await Factory.model('App/UserModel').create();
        expect(await repo.all()).to.be.length(2);
    });

});