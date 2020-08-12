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
import {ProductVendorRepository} from "../Repositories/ProductVendorRepository";
import {ProductVendorIndexArgsType} from "../Types/ProductVendor/ProductVendorIndexArgsType";
import {ProductVendorType} from "../Types/ProductVendor/ProductVendorType";
import {ProductVendorListArgsType} from "../Types/ProductVendor/ProductVendorListArgsType";
import {ProductVendorCreateArgsType} from "../Types/ProductVendor/ProductVendorCreateArgsType";
import {ProductVendorDeleteArgsType} from "../Types/ProductVendor/ProductVendorDeleteArgsType";
import {ProductVendorUpdateArgsType} from "../Types/ProductVendor/ProductVendorUpdateArgsType";
import {ProductVendorModel} from "../Models/ProductVendorModel";

@Resolver()
export class ProductVendorResolve extends BaseResolve {
    @Inject(ProductVendorRepository)
    public repo: ProductVendorRepository;

    @Query(returns => ProductVendorType)
    async index(@Args() args: ProductVendorIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(ProductVendorType))
    async list(@Args() args: ProductVendorListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => ProductVendorType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(ProductVendorCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: ProductVendorCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args as any);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => ProductVendorType)
    @ValidateArgs(ProductVendorUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ProductVendorUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args as any, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ProductVendorDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ProductVendorDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
