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
import { OrderRepository } from '../Repositories/OrderRepository';
import { OrderType } from '../Types/Order/OrderType';
import { OrderIndexArgsType } from '../Types/Order/OrderIndexArgsType';
import { OrderListArgsType } from '../Types/Order/OrderListArgsType';
import { OrderCreateArgsType } from '../Types/Order/OrderCreateArgsType';
import { OrderUpdateArgsType } from '../Types/Order/OrderUpdateArgsType';
import { OrderDeleteArgsType } from '../Types/Order/OrderDeleteArgsType';
import { OrderStatusType } from '../Types/Order/OrderStatusType';
import { OrderStatusRepository } from '../Repositories/OrderStatusRepository';
import { OrderArgsType } from '../Types/Order/OrderArgsType';

const requestIp = require('request-ip');

@Resolver()
export class OrderResolve extends BaseResolve {
    @Inject(OrderRepository)
    public repo: OrderRepository;

    @Inject(type => OrderStatusRepository)
    public repoOrderStatus: OrderStatusRepository

    @Query(returns => OrderType, { description: 'Chi tiết menu.' })
    async index(@Args() args: OrderIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(OrderType), { description: 'Danh sách menu.' })
    async list(@Args() args: OrderListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        const query = this.repo.query();

        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.paginate(args.limit, args.page);
    }

    @Query(returns => paginateType(OrderStatusType), { description: 'Danh sách trạng thái đơn hàng.' })
    async orderStatus(@Args() args: OrderListArgsType, @SelectFields() fields) {
        return this.repoOrderStatus.query()
                   .pushCriteria(new SortByCriteria(args.order))
                   .pushCriteria(new FilterCriteria(args.filter))
                   .pushCriteria(new SelectionCriteria(fields))
                   .paginate(args.limit, args.page);
    }

    @Mutation(returns => OrderType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(OrderCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: OrderCreateArgsType, @SelectFields() fields, @Ctx() { req }) {
        const created = await this.repo.create({
            ...args,
            ip: requestIp.getClientIp(req),
            forwardedIp: requestIp.getClientIp(req),
            userAgent: req.headers['user-agent']
        });
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => OrderType, { description: 'Tạo mới tài khoản' })
    @ValidateArgs(OrderArgsType)
    async order(@Args() args: OrderArgsType, @SelectFields() fields, @Ctx() { req }) {
        args.orderStatusId = '1';

        const created = await this.repo.create({
            ...args,
            ip: requestIp.getClientIp(req),
            forwardedIp: requestIp.getClientIp(req),
            userAgent: req.headers['user-agent']
        });
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }


    @Mutation(returns => OrderType)
    @ValidateArgs(OrderUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: OrderUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);

        return this.repo
                   .query()
                   .pushCriteria(new SelectionCriteria(fields))
                   .firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(OrderDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: OrderDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
