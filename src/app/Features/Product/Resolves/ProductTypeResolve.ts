/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
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
import { ProductTypeRepository } from '../Repositories/ProductTypeRepository';
import { ProductTypeIndexArgsType } from '../Types/ProductType/ProductTypeIndexArgsType';
import { ProductTypeType } from '../Types/ProductType/ProductTypeType';
import { ProductTypeListArgsType } from '../Types/ProductType/ProductTypeListArgsType';
import { ProductTypeCreateArgsType } from '../Types/ProductType/ProductTypeCreateArgsType';
import { ProductTypeDeleteArgsType } from '../Types/ProductType/ProductTypeDeleteArgsType';
import { ProductTypeUpdateArgsType } from '../Types/ProductType/ProductTypeUpdateArgsType';

@Resolver()
export class ProductTypeResolve extends BaseResolve {
    @Inject(ProductTypeRepository)
    public repo: ProductTypeRepository;

    @Query(returns => ProductTypeType)
    async index(@Args() args: ProductTypeIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(ProductTypeType))
    async list(@Args() args: ProductTypeListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(1000, args.page);
    }

    @Mutation(returns => ProductTypeType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(ProductTypeCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: ProductTypeCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args as any);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => ProductTypeType)
    @ValidateArgs(ProductTypeUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ProductTypeUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args as any, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ProductTypeDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ProductTypeDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
