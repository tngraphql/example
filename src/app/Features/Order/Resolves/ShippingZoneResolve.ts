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
import { ShippingZoneRepository } from '../Repositories/ShippingZoneRepository';
import { ShippingZoneType } from '../Types/ShippingZone/ShippingZoneType';
import { ShippingZoneIndexArgsType } from '../Types/ShippingZone/ShippingZoneIndexArgsType';
import { ShippingZoneListArgsType } from '../Types/ShippingZone/ShippingZoneListArgsType';
import { ShippingZoneCreateArgsType } from '../Types/ShippingZone/ShippingZoneCreateArgsType';
import { ShippingZoneUpdateArgsType } from '../Types/ShippingZone/ShippingZoneUpdateArgsType';
import { ShippingZoneDeleteArgsType } from '../Types/ShippingZone/ShippingZoneDeleteArgsType';

@Resolver()
export class ShippingZoneResolve extends BaseResolve {
    @Inject(ShippingZoneRepository)
    public repo: ShippingZoneRepository;

    @Query(returns => ShippingZoneType, { description: 'Chi tiết menu.' })
    async index(@Args() args: ShippingZoneIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(ShippingZoneType), { description: 'Danh sách menu.' })
    async list(@Args() args: ShippingZoneListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => ShippingZoneType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(ShippingZoneCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: ShippingZoneCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => ShippingZoneType)
    @ValidateArgs(ShippingZoneUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ShippingZoneUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);

        return this.repo
                   .query()
                   .pushCriteria(new SelectionCriteria(fields))
                   .firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ShippingZoneDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ShippingZoneDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
