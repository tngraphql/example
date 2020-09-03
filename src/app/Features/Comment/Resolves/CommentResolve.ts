import { Args, Ctx, Mutation, Query, Resolver, UseMiddleware } from '@tngraphql/graphql';
import { BaseResolve } from '../../../GraphQL/Resolves/BaseResolve';
import { Inject, ValidateArgs } from '@tngraphql/illuminate';
import { SelectFields } from '../../../../decorators/SelectFields';
import { SortByCriteria } from '../../../../Repositories/Criteria/SortByCriteria';
import { FilterCriteria } from '../../../../Repositories/Criteria/FilterCriteria';
import { SelectionCriteria } from '../../../../Repositories/Criteria/SelectionCriteria';
import { paginateType } from '../../../GraphQL/Types/PaginateType';
import { DeleteType } from '../../../GraphQL/Types/DeleteType';
import { Resource } from '../../../../lib/Resource';
import { CommentType } from '../Types/CommentType';
import { CommentDeleteArgsType } from '../Types/CommentDeleteArgsType';
import { CommentIndexArgsType } from '../Types/CommentIndexArgsType';
import { CommentListArgsType } from '../Types/CommentListArgsType';
import { CommentRepository } from '../CommentRepository';
import { CommentPostCreateArgsType } from '../Types/CommentPostCreateArgsType';
import { CommentPostUpdateArgsType } from '../Types/CommentPostUpdateArgsType';
import { CommentableEnumType } from '../Types/CommentableEnumType';
import { ISelection } from '../../../../Contracts/SelectionCriteriaContract';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
@Resolver()
export class CommentResolve extends BaseResolve {
    @Inject(CommentRepository)
    public repo: CommentRepository;

    @Query(returns => CommentType)
    async index(@Args() args: CommentIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(CommentType))
    async list(@Args() args: CommentListArgsType, @SelectFields() fields: ISelection, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(CommentDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: CommentDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }

    @Mutation(returns => CommentType, { description: 'Bình luận mới cho bài viết' })
    @ValidateArgs(CommentPostCreateArgsType)
    // @UseMiddleware('auth')
    async commentPostCreate(@Args() args: CommentPostCreateArgsType, @SelectFields() fields,) {
        const { postId, ...data } = args;

        const created = await this.repo.create(Object.assign({
            commentableId: postId,
            commentableType: CommentableEnumType.post
        }, data));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => CommentType, { description: 'Cập nhật bình luận bài viết' })
    @UseMiddleware('auth')
    async commentPostUpdate(@Args() args: CommentPostUpdateArgsType, @SelectFields() fields) {
        const created = await this.repo.update(args, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }
}
