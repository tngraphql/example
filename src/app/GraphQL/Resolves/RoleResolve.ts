/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:34 AM
 */
import { Arg, Args, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from '@tngraphql/graphql';
import { BaseResolve } from './BaseResolve';
import { SelectFields } from '../../../decorators/SelectFields';
import { paginateType } from '../Types/PaginateType';
import { SortByCriteria } from '../../../Repositories/Criteria/SortByCriteria';
import { FilterCriteria } from '../../../Repositories/Criteria/FilterCriteria';
import { SelectionCriteria } from '../../../Repositories/Criteria/SelectionCriteria';
import { Inject, ValidateArgs } from '@tngraphql/illuminate';
import { RoleType } from '../Types/Role/RoleType';
import { RoleRepository } from '../../../Repositories/Lucid/RoleRepository';
import { RoleIndexArgsType } from '../Types/Role/RoleIndexArgsType';
import { RoleListArgsType } from '../Types/Role/RoleListArgsType';
import { DeleteType } from '../Types/DeleteType';
import { RoleCreateArgsType } from '../Types/Role/RoleCreateArgsType';
import { RoleUpdateArgsType } from '../Types/Role/RoleUpdateArgsType';
import { Resource } from '../../../lib/Resource';
import { RoleDeleteArgsType } from '../Types/Role/RoleDeleteArgsType';
import { CategoryCreateArgsType } from '../../Features/Category/Types/CategoryCreateArgsType';
import { CategoryUpdateArgsType } from '../../Features/Category/Types/CategoryUpdateArgsType';

@Resolver()
export class RoleResolve extends BaseResolve {
    @Inject(RoleRepository)
    public repo: RoleRepository;

    @Query(returns => RoleType)
    @UseMiddleware('auth', 'can:role')
    async index(@Args() args: RoleIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(RoleType))
    @UseMiddleware('auth', 'can:role')
    async list(@Args() args: RoleListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => RoleType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(RoleCreateArgsType)
    @UseMiddleware('auth', 'can:role-create')
    async create(@Args() args: RoleCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => RoleType)
    @ValidateArgs(RoleUpdateArgsType)
    @UseMiddleware('auth', 'can:role-update')
    async update(@Args() args: RoleUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(RoleDeleteArgsType)
    @UseMiddleware('auth', 'can:role-delete')
    async delete(@Args() args: RoleDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
