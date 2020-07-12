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
import {ContactRepository} from "../ContactRepository";
import {ContactType} from "../Types/Contact/ContactType";
import {ContactIndexArgsType} from "../Types/Contact/ContactIndexArgsType";
import {ContactListArgsType} from "../Types/Contact/ContactListArgsType";
import {ContactCreateArgsType} from "../Types/Contact/ContactCreateArgsType";
import {ContactUpdateArgsType} from "../Types/Contact/ContactUpdateArgsType";
import {ContactDeleteArgsType} from "../Types/Contact/ContactDeleteArgsType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
@Resolver()
export class ContactResolve extends BaseResolve {
    @Inject(ContactRepository)
    public repo: ContactRepository;

    @Query(returns => ContactType)
    @UseMiddleware('auth')
    async index(@Args() args: ContactIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(ContactType))
    @UseMiddleware('auth')
    async list(@Args() args: ContactListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => ContactType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(ContactCreateArgsType)
    async create(@Args() args: ContactCreateArgsType) {
        return this.repo.create(args);
    }

    @Mutation(returns => ContactType)
    @ValidateArgs(ContactUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ContactUpdateArgsType) {
        return this.repo.update(args, args.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ContactDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ContactDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
