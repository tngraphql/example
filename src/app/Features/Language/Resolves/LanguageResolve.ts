/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:34 AM
 */
import {Args, Ctx,  Mutation, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import {BaseResolve} from "../../../GraphQL/Resolves/BaseResolve";
import {SelectFields} from "../../../../decorators/SelectFields";
import {paginateType} from "../../../GraphQL/Types/PaginateType";
import {SortByCriteria} from "../../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../../Repositories/Criteria/SelectionCriteria";
import {Inject, ValidateArgs} from "@tngraphql/illuminate";
import {DeleteType} from "../../../GraphQL/Types/DeleteType";
import {Resource} from "../../../../lib/Resource";
import {LanguageRepository} from "../LanguageRepository";
import {LanguageType} from "../Types/LanguageType";
import {LanguageIndexArgsType} from "../Types/LanguageIndexArgsType";
import {LanguageListArgsType} from "../Types/LanguageListArgsType";
import {LanguageCreateArgsType} from "../Types/LanguageCreateArgsType";
import {LanguageUpdateArgsType} from "../Types/LanguageUpdateArgsType";
import {LanguageDeleteArgsType} from "../Types/LanguageDeleteArgsType";

@Resolver()
export class LanguageResolve extends BaseResolve {
    @Inject(LanguageRepository)
    public repo: LanguageRepository;

    @Query(returns => LanguageType)
    async index(@Args() args: LanguageIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(LanguageType))
    async list(@Args() args: LanguageListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => LanguageType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(LanguageCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: LanguageCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => LanguageType)
    @ValidateArgs(LanguageUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: LanguageUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(LanguageDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: LanguageDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
