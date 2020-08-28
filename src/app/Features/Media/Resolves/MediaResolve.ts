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
import {MediaRepository} from "../MediaRepository";
import {MediaIndexArgsType} from "../Types/MediaIndexArgsType";
import {MediaType} from "../Types/MediaType";
import {MediaListArgsType} from "../Types/MediaListArgsType";
import {MediaCreateArgsType} from "../Types/MediaCreateArgsType";
import {MediaUpdateArgsType} from "../Types/MediaUpdateArgsType";
import {MediaDeleteArgsType} from "../Types/MediaDeleteArgsType";

@Resolver()
export class MediaResolve extends BaseResolve {
    @Inject(MediaRepository)
    public repo: MediaRepository;

    @Query(returns => MediaType)
    @UseMiddleware('auth')
    async index(@Args() args: MediaIndexArgsType, @SelectFields() fields) {
        const query = this.repo.query();
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.first();
    }

    @Query(returns => paginateType(MediaType))
    @UseMiddleware('auth')
    async list(@Args() args: MediaListArgsType, @SelectFields() fields, @Ctx() context) {
        const query = this.repo.query();
        query._query.where('folderName', args.folderName || null);
        query._query.orderByRaw('mine_type = "folder" DESC');
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));
        return query.paginate(args.limit, args.page);
    }

    @Mutation(returns => MediaType, {description: ''})
    @ValidateArgs(MediaCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: MediaCreateArgsType, @SelectFields() fields) {
        args.folderName = args.folderName || null;

        const created = await this.repo.create(args);
        const query = this.repo.query();
        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(created.id);
    }

    @Mutation(returns => MediaType)
    @ValidateArgs(MediaUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: MediaUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args, args.id);
        const query = this.repo.query();
        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(MediaDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: MediaDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
