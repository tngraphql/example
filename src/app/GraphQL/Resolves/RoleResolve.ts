/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:34 AM
 */
import {Arg, Args, Ctx, Int, Mutation, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import {BaseResolve} from "./BaseResolve";
import {SelectFields} from "../../../decorators/SelectFields";
import {paginateType} from "../Types/PaginateType";
import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {Inject, ValidateArgs} from "@tngraphql/illuminate";
import {RoleType} from "../Types/Role/RoleType";
import {RoleRepository} from "../../../Repositories/Lucid/RoleRepository";
import {RoleIndexArgsType} from "../Types/Role/RoleIndexArgsType";
import {RoleListArgsType} from "../Types/Role/RoleListArgsType";
import {DeleteType} from "../Types/DeleteType";
import {RoleCreateArgsType} from "../Types/Role/RoleCreateArgsType";
import {RoleUpdateArgsType} from "../Types/Role/RoleUpdateArgsType";
import {Resource} from "../../../lib/Resource";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import RoleModel from "../../Models/RoleModel";
import {RoleDeleteArgsType} from "../Types/Role/RoleDeleteArgsType";

@Resolver()
export class RoleResolve extends BaseResolve {
    @Inject(RoleRepository)
    public repo: RoleRepository;

    @Query(returns => RoleType)
    @UseMiddleware('auth')
    async index(@Args() args: RoleIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(RoleType))
    @UseMiddleware('auth')
    async list(@Args() args: RoleListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => RoleType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(RoleCreateArgsType)
    async create(@Args() args: RoleCreateArgsType) {
        return this.repo.create(args);
    }

    @Mutation(returns => RoleType)
    @ValidateArgs(RoleUpdateArgsType)
    async update(@Args() args: RoleUpdateArgsType) {
        return this.repo.update(args, args.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(RoleDeleteArgsType)
    async delete(@Arg('id', returns => [Int]) id: number, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(id), ctx.lang);
    }
}
