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
import {TagRepository} from "../Repositories/Lucid/TagRepository";
import {TagType} from "../Types/TagType";
import {TagIndexArgsType} from "../Types/TagIndexArgsType";
import {TagListArgsType} from "../Types/TagListArgsType";
import {TagCreateArgsType} from "../Types/TagCreateArgsType";
import {TagDeleteArgsType} from "../Types/TagDeleteArgsType";
import {TagUpdateArgsType} from "../Types/TagUpdateArgsType";
import {CategoryUpdateArgsType} from "../../Category/Types/CategoryUpdateArgsType";
import {CategoryCreateArgsType} from "../../Category/Types/CategoryCreateArgsType";

@Resolver()
export class TagResolve extends BaseResolve {
    @Inject(TagRepository)
    public repo: TagRepository;

    @Query(returns => TagType)
    async index(@Args() args: TagIndexArgsType, @SelectFields() fields) {
        const query = this.repo.query();
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.first();
    }

    @Query(returns => paginateType(TagType))
    async list(@Args() args: TagListArgsType, @SelectFields() fields, @Ctx() context) {
        const query = this.repo.query();
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));
        return query.paginate(args.limit, args.page);
    }

    @Mutation(returns => TagType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(TagCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: TagCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        const query = this.repo.query();
        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(created.id);
    }

    @Mutation(returns => TagType)
    @ValidateArgs(TagUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: TagUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args, args.id);
        const query = this.repo.query();
        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(TagDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: TagDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
