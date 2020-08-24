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
import {PostRepository} from "../Repositories/PostRepository";
import {PostType} from "../Types/Post/PostType";
import {PostIndexArgsType} from "../Types/Post/PostIndexArgsType";
import {PostListArgsType} from "../Types/Post/PostListArgsType";
import {PostCreateArgsType} from "../Types/Post/PostCreateArgsType";
import {PostUpdateArgsType} from "../Types/Post/PostUpdateArgsType";
import {PostDeleteArgsType} from "../Types/Post/PostDeleteArgsType";
import {PostChangeFeatureArgsType} from "../Types/Post/PostChangeFeatureArgsType";
/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
@Resolver()
export class PostResolve extends BaseResolve {
    @Inject(PostRepository)
    public repo: PostRepository;

    @Query(returns => PostType)
    async index(@Args() args: PostIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(PostType))
    // @UseMiddleware('auth')
    async list(@Args() args: PostListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => PostType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(PostCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: PostCreateArgsType, @SelectFields() fields) {
        await this.authorize('post-create');
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => PostType)
    @ValidateArgs(PostUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: PostUpdateArgsType, @SelectFields() fields) {
        const post = await this.repo.query().firstBy(args.id);

        await this.authorize('post-update', post);

        const category = await this.repo.update(args, args.id);

        return this.repo
            .query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(PostDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: PostDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }

    @Mutation(returns => PostType)
    @ValidateArgs(PostChangeFeatureArgsType)
    @UseMiddleware('auth')
    async postChangeFeature(@Args() args: PostChangeFeatureArgsType, @SelectFields() fields) {
        const category = await this.repo.changeFeatured(args.isFeatured, args.id);

        return this.repo
            .query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(category.id);
    }
}
