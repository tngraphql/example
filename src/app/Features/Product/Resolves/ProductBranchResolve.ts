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
import {ProductBranchIndexArgsType} from "../Types/ProductBranch/ProductBranchIndexArgsType";
import {ProductBranchListArgsType} from "../Types/ProductBranch/ProductBranchListArgsType";
import {ProductBranchDeleteArgsType} from "../Types/ProductBranch/ProductBranchDeleteArgsType";
import {ProductBranchRepository} from "../Repositories/ProductBranchRepository";
import {ProductBranchType} from "../Types/ProductBranch/ProductBranchType";
import {ProductInventoryType} from "../Types/Product/ProductInventoryType";
import {InventoryArgsType} from "../Types/ProductBranch/InventoryArgsType";
import {InventoryRepository} from "../Repositories/InventoryRepository";
import {ProductMasterFeaturedArgsType} from "../Types/Product/ProductMasterFeaturedArgsType";

@Resolver()
export class ProductBranchResolve extends BaseResolve {
    @Inject(ProductBranchRepository)
    public repo: ProductBranchRepository;

    @Inject(InventoryRepository)
    public inventory: InventoryRepository;


    @Query(returns => ProductBranchType, {
        description: 'Chi tiết sản phẩm'
    })
    async index(@Args() args: ProductBranchIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().first();
    }

    @Query(returns => paginateType(ProductBranchType))
    async list(@Args() args: ProductBranchListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.query().paginate(args.limit, args.page);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ProductBranchDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ProductBranchDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }

    @Mutation(returns => ProductInventoryType, {description: 'Điều chỉnh số lượng hàng tồn kho'})
    @ValidateArgs(InventoryArgsType)
    // @UseMiddleware('auth')
    async inventoryAdjustQuantity(@Args() args: InventoryArgsType, @SelectFields() fields) {
        await this.inventory.updateQuantity(args, args.productBranchId);

        return this.inventory.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(args.productBranchId, 'productBranchId');
    }
}
