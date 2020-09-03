/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
import { Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from '@tngraphql/graphql';
import { BaseResolve } from '../../../GraphQL/Resolves/BaseResolve';
import { Inject, ValidateArgs } from '@tngraphql/illuminate';
import { SelectFields } from '../../../../decorators/SelectFields';
import { SortByCriteria } from '../../../../Repositories/Criteria/SortByCriteria';
import { FilterCriteria } from '../../../../Repositories/Criteria/FilterCriteria';
import { SelectionCriteria } from '../../../../Repositories/Criteria/SelectionCriteria';
import { paginateType } from '../../../GraphQL/Types/PaginateType';
import { DeleteType } from '../../../GraphQL/Types/DeleteType';
import { Resource } from '../../../../lib/Resource';
import { ShippingMethodType } from '../Types/ShippingMethod/ShippingMethodType';
import { ShippingMethodIndexArgsType } from '../Types/ShippingMethod/ShippingMethodIndexArgsType';
import { ShippingMethodListArgsType } from '../Types/ShippingMethod/ShippingMethodListArgsType';
import { ShippingMethodCreateArgsType } from '../Types/ShippingMethod/ShippingMethodCreateArgsType';
import { ShippingMethodUpdateArgsType } from '../Types/ShippingMethod/ShippingMethodUpdateArgsType';
import { ShippingMethodDeleteArgsType } from '../Types/ShippingMethod/ShippingMethodDeleteArgsType';
import { ShippingMethodRepository } from '../Repositories/ShippingMethodRepository';

@Resolver()
export class ShippingMethodResolve extends BaseResolve {
    @Inject(ShippingMethodRepository)
    public repo: ShippingMethodRepository;

    @Query(returns => ShippingMethodType, { description: 'Chi tiết menu.' })
    async index(@Args() args: ShippingMethodIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(ShippingMethodType), { description: 'Danh sách menu.' })
    async list(@Args() args: ShippingMethodListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => ShippingMethodType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(ShippingMethodCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: ShippingMethodCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => ShippingMethodType)
    @ValidateArgs(ShippingMethodUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ShippingMethodUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);

        return this.repo
                   .query()
                   .pushCriteria(new SelectionCriteria(fields))
                   .firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ShippingMethodDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ShippingMethodDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
