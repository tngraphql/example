/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {MetaInput} from "../../../../GraphQL/Types/Input/MetaInput";
import {HTML} from "../../../../GraphQL/Types/ScalarType/HtmlScalerType";
import {GraphQLString} from "graphql";
import {ProductBranchInputType} from "./ProductBranchInputType";
import {ProductMasterKindEnumType} from "./ProductMasterKindEnumType";

@ArgsType()
export class ProductCreateArgsType {
    @Field({description: 'Tên sản phẩm',})
    @Rules(args => ([
        'required',
    ]))
    public name: string

    @Field(returns => ProductMasterKindEnumType)
    public kind: string

    @Field({description: 'Ảnh đại diện'})
    public avatar: string

    @Field({description: 'Seo title'})
    public seoTitle: string;

    @Field(returns => ID)
    public thumbnailId: string

    @Field({description: 'Ảnh theo attribute hay không',})
    public imageType: string

    @Field(returns => HTML, {description: 'Mô tả ngắn'})
    public description: string

    @Field(returns => HTML, {description: 'Nội dung'})
    @Rules(args => ([
        'required',
    ]))
    public content: string

    @Field(returns => ID, {description: 'Loại'})
    public productTypeId: string

    @Field(returns => ID, {description: 'Nhà cung cấp'})
    public productVendorId: string

    @Field(returns => [GraphQLString], {description: 'Gắn tag',})
    public tags: string[]

    @Field(returns => [ID], {description: 'Chọn danh mục.'})
    public categories: string

    @Field(returns => [ProductBranchInputType], {description: 'Sản phẩm phân nhánh'})
    @Rules(args => ([
        'required',
    ]))
    public branches: ProductBranchInputType[]

    @Field(returns => [MetaInput], {description: 'Các trường tự do.'})
    public meta: MetaInput[];

    public isFeatured?: boolean;
    public views?: number;
    public commentStatus?: string;
    public commentCount?: number;
}