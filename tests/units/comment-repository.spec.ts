/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/30/2020
 * Time: 7:37 PM
 */
import {resetTables, seedDB} from "../helpers";
import {Application} from "@tngraphql/illuminate";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";
import {CommentRepository} from "../../src/app/Features/Comment/CommentRepository";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {UserModel} from "../../src/app/UserModel";
import {CommentableEnumType} from "../../src/app/Features/Comment/Types/CommentableEnumType";
import {expect} from 'chai';
import {OptionRepository} from "../../src/Repositories/Lucid/OptionRepository";
import {CommentStatusEnumType} from "../../src/app/Features/Comment/Types/CommentStatusEnumType";
import {PostModel} from "../../src/app/Features/Post/PostModel";
import CommentModel from "../../src/app/Features/Comment/CommentModel";

describe('User Repository', () => {
    describe('Create', () => {
        let app: Application;
        let context;
        let repo;

        before(async () => {
            app = Application.getInstance<Application>()
            context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
            repo = await app.make(CommentRepository, context);
        });
        beforeEach(async () => {
            await seedDB();
        });

        afterEach(async () => {
            await resetTables();
            await Factory.model('App/Features/Comment/CommentModel').reset();
        });

        it('create a comment', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });
            const data = await CommentModel.findBy('id',res.id);
            const posted = await PostModel.findBy('id', post.id);

            expect(data.id).to.be.not.undefined;
            expect(data.commentableId).to.be.eq(post.id);
            expect(data.commentableType).to.be.eq(CommentableEnumType.post);
            expect(data.status).to.be.eq(CommentStatusEnumType.approved);
            expect(data.publishedAt).to.be.not.null;
            expect(posted.commentCount).to.be.eq(1);
        });

        it('create comment when commentModeration is true', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 1});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });
            const data = await CommentModel.findBy('id',res.id);

            expect(data.id).to.be.not.undefined;
            expect(data.status).to.be.eq(CommentStatusEnumType.pending);
            expect(data.publishedAt).to.be.null
        });

        it('create comment when setting commentBlacklistKeys is nikk', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentBlacklistKeys: 'nikk'});
            const data = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });
            expect(data.id).to.be.not.undefined;
            expect(data.status).to.be.eq(CommentStatusEnumType.trash);
        });

        it('create comment when setting commentBlacklistKeys is [nikk, spam]', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({
                commentBlacklistKeys:
                    `nikk
spam`
            });
            const data = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'spam'
            });
            expect(data.id).to.be.not.undefined;
            expect(data.status).to.be.eq(CommentStatusEnumType.trash);
        });

        it('create comment when setting commentModerationKeys', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModerationKeys: 'nikk'});
            const data = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });
            expect(data.id).to.be.not.undefined;
            expect(data.status).to.be.eq(CommentStatusEnumType.pending);
        });

        it('should rollback when type can\'t defined', async () => {
            let err;
            try {
                await repo.create({
                    commentableId: '1',
                    commentableType: CommentableEnumType.product,
                    body: 'nikk'
                })
            } catch (e) {
                err = e;
            }

            const comment = await CommentModel.first()
            expect(err.message).to.be.eq('Comment type product is not defined.');
            expect(comment).to.be.null;
        });
    });

    describe('Update', () => {
        let app: Application;
        let context;
        let repo;

        before(async () => {
            app = Application.getInstance<Application>()
            context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
            repo = await app.make(CommentRepository, context);
        });
        beforeEach(async () => {
            await seedDB();
        });

        afterEach(async () => {
            await resetTables();
            await Factory.model('App/Features/Comment/CommentModel').reset();
        });

        it('comment update body', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 1});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            const res2 = await repo.update({
                body: 'vikk'
            }, res.id);
            const data = await CommentModel.findBy('id',res2.id);

            expect(res2.id).to.be.eq(res.id);
            expect(res2.body).to.be.eq('vikk');
            expect(data.status).to.be.eq(CommentStatusEnumType.pending);
        });

        it('comment update status. change status to approved', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 1});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            const res2 = await repo.update({
                status: CommentStatusEnumType.approved
            }, res.id);
            const data = await CommentModel.findBy('id',res2.id);
            const posted = await PostModel.findBy('id', post.id);

            expect(res2.id).to.be.eq(res.id);
            expect(data.status).to.be.eq(CommentStatusEnumType.approved);
            expect(posted.commentCount).to.be.eq(1);
        });

        it('comment update status. change status cancel approved', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 0});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            const res2 = await repo.update({
                status: CommentStatusEnumType.pending
            }, res.id);
            const data = await CommentModel.findBy('id',res2.id);
            const posted = await PostModel.findBy('id', post.id);

            expect(res2.id).to.be.eq(res.id);
            expect(data.status).to.be.eq(CommentStatusEnumType.pending);
            expect(posted.commentCount).to.be.eq(0);
        });
    });

    describe('Delete', () => {
        let app: Application;
        let context;
        let repo;

        before(async () => {
            app = Application.getInstance<Application>()
            context = {context: {auth: new RequestGuard(() => UserModel.first(), {}, {} as any)}} as any;
            repo = await app.make(CommentRepository, context);
        });
        beforeEach(async () => {
            await seedDB();
        });

        afterEach(async () => {
            await resetTables();
            await Factory.model('App/Features/Comment/CommentModel').reset();
        });

        it('delete a comment', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 1});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            await repo.delete(res.id);
            const data = await CommentModel.findBy('id', res.id);
            expect(data).to.be.null;
        });

        it('delete a comment have status pending', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 1});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            await repo.delete(res.id);
            const posted = await PostModel.findBy('id', post.id);
            expect(posted.commentCount).to.be.eq(0);
        });

        it('delete a comment have status approved', async () => {
            const post = await Factory.model('App/Features/Post/PostModel').create();
            const config = new OptionRepository();
            await config.saveSetting({commentModeration: 0});
            const res = await repo.create({
                commentableId: post.id,
                commentableType: CommentableEnumType.post,
                body: 'nikk'
            });

            await repo.delete(res.id);
            const posted = await PostModel.findBy('id', post.id);
            expect(posted.commentCount).to.be.eq(0);
        });
    });
});