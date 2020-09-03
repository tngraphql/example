/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 7:43 PM
 */
import { Field, Float, InputType, Int } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { ProductAttributeInputType } from './ProductAttributeInputType';
import { ProductImageInputType } from './ProductImageInputType';
import { ProductInventoryInputType } from './ProductInventoryInputType';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ProductBranchModel } from '../../Models/ProductBranchModel';

@InputType('ProductBranchInput')
export class ProductBranchInputType {

    @Field(returns => ID, { description: 'ID' })
    @Rules([
        Rule.exists(ProductBranchModel.getTable(), 'id')
    ])
    public id?: string;

    @Field({ description: 'Mã SKU' })
    public sku?: string;

    @Field({ description: 'Mã code' })
    public code?: string;

    @Field({ description: 'Tính thuế VAT?' })
    public taxable?: string;

    @Field(returns => ID, { description: 'Loại sản phẩm' })
    public productTypeId?: string;

    @Field({ description: 'Giá trị quy đổi của đơn vị tính' })
    public unitValue?: string;

    @Field({ description: 'Tên đơn vị tính' })
    public unitName?: string;

    @Field({ description: 'Giá bán' })
    public price?: number;

    @Field({ description: 'Giá so sánh' })
    public priceSale?: number;

    @Field(returns => [ProductAttributeInputType], { description: 'Thuộc tính sản phẩm' })
    public attributes?: ProductAttributeInputType[];

    @Field(returns => [ProductImageInputType], { description: 'Hình ảnh sản phẩm' })
    public images?: ProductImageInputType[];

    @Field(returns => ProductInventoryInputType, { description: 'Tồn kho sản phẩm' })
    public inventory?: ProductInventoryInputType;

    @Field({ description: 'Là sản phẩm vật lý' })
    public requiresShipping?: boolean;

    @Field({ description: 'Trọng lượng', defaultValue: 0 })
    public weight?: number;

    @Field({ description: 'Đơn vị tính trọng lượng' })
    public weightClass?: string;

    @Field({ description: 'Chiều dài' })
    public length?: number;

    @Field({ description: 'Chiều rộng' })
    public width?: number;

    @Field({ description: 'Chiều cao' })
    public height?: number;

    @Field({ description: 'Đơn vị tính chiều dài' })
    public lengthClass?: string;

    public productMasteId?: string;
}
