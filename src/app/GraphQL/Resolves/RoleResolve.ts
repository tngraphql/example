/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:34 AM
 */
import {Args, Ctx, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import {BaseResolve} from "./BaseResolve";
import {SelectFields} from "../../../decorators/SelectFields";
import {paginateType} from "../Types/PaginateType";
import {IPaginateType} from "../../../Contracts/IPaginateType";
import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {Inject} from "@tngraphql/illuminate";
import {RoleType} from "../Types/Role/RoleType";
import {RoleRepository} from "../../../Repositories/Lucid/RoleRepository";
import {RoleIndexArgsType} from "../Types/Role/RoleIndexArgsType";
import {RoleListArgsType} from "../Types/Role/RoleListArgsType";

@Resolver()
export class RoleResolve extends BaseResolve {
    @Inject(RoleRepository)
    public repo: RoleRepository;

    @Query(returns => RoleType)
    @UseMiddleware('auth')
    async index(@Args() args: RoleIndexArgsType, @SelectFields() fields): Promise<RoleType> {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(RoleType))
    @UseMiddleware('auth')
    async list(@Args() args: RoleListArgsType, @SelectFields() fields, @Ctx() context): Promise<IPaginateType<RoleType>> {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }
}
