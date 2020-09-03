import { Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from '@tngraphql/graphql';
import { BaseResolve } from '../../../GraphQL/Resolves/BaseResolve';
import { Inject, ValidateArgs } from '@tngraphql/illuminate';
import { SelectFields } from '../../../../decorators/SelectFields';
import { SortByCriteria } from '../../../../Repositories/Criteria/SortByCriteria';
import { FilterCriteria } from '../../../../Repositories/Criteria/FilterCriteria';
import { SelectionCriteria } from '../../../../Repositories/Criteria/SelectionCriteria';
import { paginateType } from '../../../GraphQL/Types/PaginateType';
import { DeleteType } from '../../../GraphQL/Types/DeleteType';
import { Resource } from '../../../../lib/Resource';
import { CategoryRepository } from '../CategoryRepository';
import { CategoryType } from '../Types/CategoryType';
import { CategoryIndexArgsType } from '../Types/CategoryIndexArgsType';
import { CategoryCreateArgsType } from '../Types/CategoryCreateArgsType';
import { CategoryListArgsType } from '../Types/CategoryListArgsType';
import { CategoryDeleteArgsType } from '../Types/CategoryDeleteArgsType';
import { CategoryUpdateArgsType } from '../Types/CategoryUpdateArgsType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
@Resolver()
export class CategoryResolve extends BaseResolve {
    @Inject(CategoryRepository)
    public repo: CategoryRepository;

    @Query(returns => CategoryType)
    async index(@Args() args: CategoryIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(CategoryType))
    async list(@Args() args: CategoryListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(1000, args.page);
    }

    @Mutation(returns => CategoryType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(CategoryCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: CategoryCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => CategoryType)
    @ValidateArgs(CategoryUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: CategoryUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(CategoryDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: CategoryDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
