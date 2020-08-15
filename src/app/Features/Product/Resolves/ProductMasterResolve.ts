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
import {ProductTypeIndexArgsType} from "../Types/ProductType/ProductTypeIndexArgsType";
import {ProductTypeType} from "../Types/ProductType/ProductTypeType";
import {ProductTypeListArgsType} from "../Types/ProductType/ProductTypeListArgsType";
import {ProductTypeCreateArgsType} from "../Types/ProductType/ProductTypeCreateArgsType";
import {ProductTypeDeleteArgsType} from "../Types/ProductType/ProductTypeDeleteArgsType";
import {ProductTypeUpdateArgsType} from "../Types/ProductType/ProductTypeUpdateArgsType";
import {ProductMasterRepository} from "../Repositories/ProductMasterRepository";
import {ProductMasterType} from "../Types/Product/ProductMasterType";
import {ProductCreateArgsType} from "../Types/Product/ProductCreateArgsType";
import {ProductUpdateArgsType} from "../Types/Product/ProductUpdateArgsType";
import {ProductMasterIndexArgsType} from "../Types/Product/ProductMasterIndexArgsType";
import {ProductMasterListArgsType} from "../Types/Product/ProductMasterListArgsType";
import {ProductMasterDeleteArgsType} from "../Types/Product/ProductMasterDeleteArgsType";
import {ProductMasterFeaturedArgsType} from "../Types/Product/ProductMasterFeaturedArgsType";

@Resolver()
export class ProductMasterResolve extends BaseResolve {
    @Inject(ProductMasterRepository)
    public repo: ProductMasterRepository;

    @Query(returns => ProductMasterType, {
        description: 'Chi tiết sản phẩm'
    })
    async index(@Args() args: ProductMasterIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(ProductMasterType))
    async productMasterList(@Args() args: ProductMasterListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => ProductMasterType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(ProductCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: ProductCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.builderCreate(args as any);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => ProductMasterType)
    @ValidateArgs(ProductUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ProductUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args as any, args.id);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ProductMasterDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ProductMasterDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }

    /**
     * Thay đổi sản phẩm nổi bật
     */
    @Mutation(returns => ProductMasterType, {description: 'Thay đổi sản phẩm nổi bật'})
    @ValidateArgs(ProductMasterFeaturedArgsType)
    // @UseMiddleware('auth')
    async productChangeFeature(@Args() args: ProductMasterFeaturedArgsType, @SelectFields() fields) {
        await this.repo.changeFeatured(args.isFeatured, args.id);

        return this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(args.id);
    }
}
