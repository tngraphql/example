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
import {ContactReplyRepository} from "../ContactReplyRepository";
import {ContactReplyCreateArgsType} from "../Types/ContactReply/ContactReplyCreateArgsType";
import {ContactReplyType} from "../Types/ContactReply/ContactReplyType";
import {ContactReplyIndexArgsType} from "../Types/ContactReply/ContactReplyIndexArgsType";
import {ContactReplyDeleteArgsType} from "../Types/ContactReply/ContactReplyDeleteArgsType";
import {ContactReplyListArgsType} from "../Types/ContactReply/ContactReplyListArgsType";
import {ContactReplyUpdateArgsType} from "../Types/ContactReply/ContactReplyUpdateArgsType";
import {Factory} from "@tngraphql/illuminate/dist/Support/Facades";
import ContactReplyModel from "../ContactReplyModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
@Resolver()
export class ContactReplyResolve extends BaseResolve {
    @Inject(ContactReplyRepository)
    public repo: ContactReplyRepository;

    @Query(returns => ContactReplyType)
    async index(@Args() args: ContactReplyIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(ContactReplyType))
    @UseMiddleware('auth')
    async list(@Args() args: ContactReplyListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => ContactReplyType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(ContactReplyCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: ContactReplyCreateArgsType) {
        return this.repo.create(args);
    }

    @Mutation(returns => ContactReplyType)
    @ValidateArgs(ContactReplyUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ContactReplyUpdateArgsType) {
        return this.repo.update(args, args.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ContactReplyDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ContactReplyDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
