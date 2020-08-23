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
import {PageType} from "../Types/Page/PageType";
import {PageIndexArgsType} from "../Types/Page/PageIndexArgsType";
import {PageListArgsType} from "../Types/Page/PageListArgsType";
import {PageCreateArgsType} from "../Types/Page/PageCreateArgsType";
import {PageUpdateArgsType} from "../Types/Page/PageUpdateArgsType";
import {PageDeleteArgsType} from "../Types/Page/PageDeleteArgsType";
import {PageRepository} from "../Repositories/PageRepository";

@Resolver()
export class PageResolve extends BaseResolve {
    @Inject(PageRepository)
    public repo: PageRepository;

    @Query(returns => PageType)
    async index(@Args() args: PageIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(PageType))
    // @UseMiddleware('auth')
    async list(@Args() args: PageListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => PageType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(PageCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: PageCreateArgsType, @SelectFields() fields) {
        await this.authorize('post-create');
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => PageType)
    @ValidateArgs(PageUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: PageUpdateArgsType, @SelectFields() fields) {
        const post = await this.repo.query().firstBy(args.id);

        await this.authorize('post-update', post);

        const category = await this.repo.update(args, args.id);

        return this.repo
            .query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(PageDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: PageDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
