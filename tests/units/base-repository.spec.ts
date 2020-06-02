/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 9:19 PM
 */
import {cleanup, resetTables, setup} from "../helpers";

import {expect} from 'chai';
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {Criteria} from "../../src/Repositories/Criteria/Criteria";
import {BaseRepository} from "../../src/Repositories/Lucid/BaseRepository";
import {SortEnumType} from "../../src/app/GraphQL/Types/SortEnumType";

function getBaseRepository() {
    class Example extends BaseRepository {
        model(): LucidModel {
            return undefined;
        }
    }

    return Example;
}

describe('Base Repository', () => {
    let UserModel;
    let ProfileModel;
    let UserRepository: ReturnType<typeof getBaseRepository>;

    before(async () => {

        class Profile extends BaseModel {
            @column()
            public id: string;
        }

        class UserModelClass extends BaseModel {
            public static table = 'users'

            @column({isPrimary: true})
            public id: string;

            @column()
            public name: string;

            @hasOne(() => Profile)
            public profile: HasOne<typeof Profile>
        }

        class UserRepositoryClass extends BaseRepository<UserModelClass> {
            model(): LucidModel {
                return UserModelClass;
            }

        }

        UserModel = UserModelClass;
        ProfileModel = Profile;
        UserRepository = UserRepositoryClass as any;
    });

    before(async () => {
        await setup();
    })
    after(async () => {
        await cleanup();
    });
    // beforeEach(async () => {
    //     await resetTables();
    //     UserModel.create({name: 'nguyen'})
    // });

    it('should new query', async () => {
        const repo = new UserRepository();

        expect(repo._query).to.not.eq(repo.query()._query);
    });

    it('limit', async () => {
        const repo = new UserRepository();
        repo.limit(10);
        expect(repo._query.toSQL().sql).to.eq(UserModel.query().limit(10).toSQL().sql);
    });

    it('order by', async () => {
        const repo = new UserRepository();
        repo.orderBy('id', SortEnumType.DESC);
        expect(repo._query.toSQL().sql).to.eq(UserModel.query().orderBy('id', SortEnumType.DESC).toSQL().sql);
    });

    it('all', async () => {
        const repo = new UserRepository();
        let task = [];
        repo._query.client.getWriteClient().on('query', data => {
            task.push(data);
        });

        const a = await repo.all();

        expect(task).to.be.length(1);
        expect(task[0].sql).to.deep.eq(UserModel.query().toSQL().sql);
    });

    it('all using limit', async () => {
        const repo = new UserRepository();
        let task = [];
        repo._query.client.getWriteClient().on('query', data => {
            task.push(data);
        });

        repo.limit(10);
        const a = await repo.all();

        expect(task).to.be.length(1);
        expect(task[0].sql).to.deep.eq(UserModel.query().limit(10).toSQL().sql);
    });

    it('offset', async () => {
        const repo = new UserRepository();
        repo.offset(10);
        expect(repo._query.toSQL().sql).to.eq(UserModel.query().offset(10).toSQL().sql);
        expect(repo._query.toSQL().sql).to.not.eq(UserModel.query().offset(0).toSQL().sql);
    });

    it('create', async () => {
        const repo = new UserRepository();
        const user: any = await repo.create({name: 'nguyen'});
        expect(user.name).to.be.eq('nguyen');
    });

    it('update', async () => {
        const repo = new UserRepository();
        await repo.create({name: 'nguyen'});
        const user: any = await repo.update({name: 'anh'}, 'nguyen', 'name');
        expect(user.name).to.be.eq('anh');
    });

    it('delete', async () => {
        const repo = new UserRepository();
        const user: any = await repo.create({name: 'nguyen'});
        expect(await repo.delete(user.id)).to.be.eq(1);
        expect(await UserModel.query().where('id', user.id).first()).to.be.null;
    });

    it('delete where attribute', async () => {
        const repo = new UserRepository();
        await repo.create({name: 'nguyen'});
        const deleted = await repo.delete('nguyen', 'name');
        expect(deleted).to.be.eq(1);
    });

    it('delete many id', async () => {
        // await UserModel.create({name: '1232'});

        const repo = new UserRepository();
        const stack = [];
        const deleteFn = repo.delete.bind(repo)
        repo.delete = function (id, a = 'id') {
            stack.push(id);
            return deleteFn(id, a);
        };
        const user: any = await repo.create({name: 'nguyen'});
        expect(await repo.destroy([user.id])).to.deep.eq([user.id]);
        expect(await UserModel.query().where('id', '2').first()).to.be.null;
        expect(stack[0].id).to.eq(user.id);
    });


    describe('Base Repository | Crireria', () => {
        let ActiveCriteria;
        let repo;
        beforeEach(async () => {
            class ActiveCriteriaClass extends Criteria {
                public apply(query, repository) {
                    query.where('id', 1);
                }
            }

            ActiveCriteria = ActiveCriteriaClass;
            repo = new UserRepository();
        });

        it('should apply crireria when run [first]', async () => {
            repo.pushCriteria(new ActiveCriteria());

            const ActualSql = await UserModel.query().where('id', 1).limit(1).toSQL();
            const task = [];
            repo._query.knexQuery.on('query', data => {
                task.push(data);
            });

            await repo.first();
            expect(task).to.be.length(1);
            expect(task[0].sql).to.be.equal(ActualSql.sql);
        });

        it('skip criterial', async () => {
            repo.pushCriteria(new ActiveCriteria());
            repo.skipCriteria();

            const ActualSql = await UserModel.query().limit(1).toSQL();
            const task = [];
            repo._query.knexQuery.on('query', data => {
                task.push(data);
            });

            await repo.first();
            expect(task).to.be.length(1);
            expect(task[0].sql).to.be.equal(ActualSql.sql);
        });

        it('reset scope', async () => {
            repo.pushCriteria(new ActiveCriteria());
            repo.skipCriteria();
            repo.resetScope();

            const ActualSql = await UserModel.query().where('id', 1).limit(1).toSQL();
            const task = [];
            repo._query.knexQuery.on('query', data => {
                task.push(data);
            });

            await repo.first();
            expect(task).to.be.length(1);
            expect(task[0].sql).to.be.equal(ActualSql.sql);
        });

        it('should prevents from overwriting same criteria in chain usage', async () => {
            const repo = new UserRepository();

            repo.pushCriteria(new ActiveCriteria());
            repo.pushCriteria(new ActiveCriteria());

            expect(repo.getCriteria()).to.deep.eq([new ActiveCriteria()]);
        });

        it('should allow overwriting same criteria in chain usage', async () => {
            const repo = new UserRepository();
            repo['preventCriteriaOverwriting'] = false;

            repo.pushCriteria(new ActiveCriteria());
            repo.pushCriteria(new ActiveCriteria());

            expect(repo.getCriteria()).to.deep.eq([new ActiveCriteria(), new ActiveCriteria()]);
        });
    });

    describe('Base Repository | Paginate', () => {
        let repo: BaseRepository<any>;

        beforeEach(async () => {
            repo = new UserRepository();
        });

        it('should throw error when page < 1', async () => {
            return expect(repo.paginate(20, '*', 0)).to.be.rejectedWith(Error);
        });

        // it('should throw error when page exists', async () => {
        //     return expect(repo.paginate(20, '*', 2)).to.be.rejectedWith('The page you were looking for doesn\'t exist');
        // });

        it('success', async () => {
            const data = await repo.paginate();
        });
    });
});