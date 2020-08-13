/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Arg, Ctx, Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import {ProductBranchModel} from "../../Models/ProductBranchModel";
import {ProductMasterType} from "./ProductMasterType";
import {ProductAttributeType} from "./ProductAttributeType";
import {ProductImageType} from "./ProductImageType";
import {ProductInventoryType} from "./ProductInventoryType";

@ObjectType('ProductBranch')
export class ProductBranchType {
    static model = ProductBranchModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên sản phẩm'})
    public name: string;

    @Field({description: 'Mã sku'})
    public sku: string;

    @Field({description: 'Mã code'})
    public code: string;

    @Field({description: 'Là sản phẩm chính',})
    public isMaster(@Root() parent): boolean {
        return parent.isMaster === 2;
    };

    @Field({description: 'Tên đầy đủ'})
    public fullname: string;

    @Field(returns => ProductMasterType,{description: 'sản phẩm chính'})
    public master: ProductMasterType;

    @Field({description: 'Giá trị đơn vị tính'})
    public unitValue: number;

    @Field({description: 'Tên đơn vị tính'})
    public unitName: string;

    @Field(returns => ID,{description: 'Sản phẩm chủ'})
    public productMasterId: string;

    @Field({description: 'Tổng số sản phẩm nhánh',})
    public branchCount(@Root() parent): number {
        if (!parent.branchCount) {
            return 0;
        }

        return parent.branchCount.$extras.total;
    };

    @Field(returns => [ProductBranchType],{description: 'Các sản phẩm nhánh'})
    public branches: ProductBranchType[];

    @Field(returns => [ProductAttributeType], {description: 'Các thuộc tính sản phẩm'})
    public attributes: ProductAttributeType[];

    @Field(returns => [ProductImageType],{description: 'Các hình ảnh'})
    public images: ProductImageType[];

    @Field({description: 'Giá sản phẩm'})
    public price: number;

    @Field({description: 'Giá so sánh'})
    public priceSale: number;

    @Field(returns => ProductInventoryType, {description: 'Kho hàng'})
    public inventory: ProductInventoryType;

    @Field({description: 'Là sản phẩm vật lý',})
    public requiresShipping(@Root() parent): boolean {
        return parent.requiresShipping === 2;
    };

    @Field({description: 'Trọng lượng'})
    public weight: number;

    @Field({description: 'Đơn vị tính trọng lượng'})
    public weightClass: string;

    @Field({description: 'Chiều dài'})
    public length: number;

    @Field({description: 'Chiều rộng'})
    public width: number;

    @Field({description: 'Chiều cao'})
    public height: number;

    @Field({description: 'Đơn vị tính chiều dài'})
    public lengthClass: string;

    @Field(returns => Int,{description: 'Quản lý tồn kho. Theo dõi tồn kho | không theo dõi tồn kho.'})
    public inventoryManagement: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ProductBranchType);