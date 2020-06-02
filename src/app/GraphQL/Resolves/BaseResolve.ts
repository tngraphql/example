import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {Args, Ctx, Query, Resolver, UseMiddleware} from "@tngraphql/graphql";
import {UserType} from "../Types/User/UserType";
import {Filter} from "../Middleware/Filter";
import {UserIndexArgsType} from "../Types/User/UserIndexArgsType";
import {SelectFields} from "../../../decorators/SelectFields";
import {paginateType} from "../Types/PaginateType";
import {UserListArgsType} from "../Types/User/UserListArgsType";
import {IPaginateType} from "../../../Contracts/IPaginateType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:59 PM
 */

@Resolver()
export class BaseResolve {
    public repo: BaseRepository;

    getFirst(args, fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().first();
    }

    getPaginate(args, fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().first();
    }

    @Query(returns => UserType)
    @UseMiddleware(Filter)
    async index(@Args() args: UserIndexArgsType, @SelectFields() fields): Promise<UserType> {
        return this.getFirst(args, fields) as any;
    }

    @Query(returns => paginateType(UserType))
    async list(@Args() args: UserListArgsType, @SelectFields() fields, @Ctx() context): Promise<IPaginateType<UserType>> {
        return this.getPaginate(args, fields) as any;
    }
}