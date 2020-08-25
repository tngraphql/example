/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */

import {Args, Ctx, Mutation, Query, Resolver, UseMiddleware} from "@tngraphql/graphql";
import {BaseResolve} from "../../../GraphQL/Resolves/BaseResolve";
import {Inject, ValidateArgs} from "@tngraphql/illuminate";
import {SelectFields} from "../../../../decorators/SelectFields";
import {SortByCriteria} from "../../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../../Repositories/Criteria/SelectionCriteria";
import {paginateType} from "../../../GraphQL/Types/PaginateType";
import {DeleteType} from "../../../GraphQL/Types/DeleteType";
import {Resource} from "../../../../lib/Resource";
import {FavoriteRepository} from "../FavoriteRepository";
import {FavoriteType} from "../Types/FavoriteType";
import {FavoriteIndexArgsType} from "../Types/FavoriteIndexArgsType";
import {FavoriteListArgsType} from "../Types/FavoriteListArgsType";
import {FavoriteCreateArgsType} from "../Types/FavoriteCreateArgsType";
import {FavoriteUpdateArgsType} from "../Types/FavoriteUpdateArgsType";
import {FavoriteDeleteArgsType} from "../Types/FavoriteDeleteArgsType";
import {OperatorEnumType} from "../../../GraphQL/Types/OperatorEnumType";

@Resolver()
export class FavoriteResolve extends BaseResolve {
    @Inject(FavoriteRepository)
    public repo: FavoriteRepository;

    @Query(returns => FavoriteType)
    @UseMiddleware('auth')
    async index(@Args() args: FavoriteIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(FavoriteType))
    @UseMiddleware('auth')
    async list(@Args() args: FavoriteListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.paginate(args.limit, args.page);
    }

    @Query(returns => paginateType(FavoriteType), {description: 'Danh sách yêu thích của người dùng'})
    @UseMiddleware('auth')
    async favoritesUser(@Args() args: FavoriteListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        this.repo.pushCriteria(new FilterCriteria({
            operator: OperatorEnumType.AND,
            items: [
                args.filter,
                {
                    value: await context.auth.id(),
                    operator: OperatorEnumType.eq,
                    field: 'userId'
                }
            ].filter(x => !!x)
        }));
        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => FavoriteType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(FavoriteCreateArgsType)
    async create(@Args() args: FavoriteCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => FavoriteType)
    @ValidateArgs(FavoriteUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: FavoriteUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(FavoriteDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: FavoriteDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
