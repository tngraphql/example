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
import {ProductMasterModel} from "../../Models/ProductMasterModel";
import {ProductMasterKindEnumType} from "./ProductMasterKindEnumType";
import {Str} from "../../../../../lib/Str";
import {ContentFormatEnumType} from "../../../../GraphQL/Types/ContentFormatEnumType";
import {HTML} from "../../../../GraphQL/Types/ScalarType/HtmlScalerType";
import {htmlField} from "../../../../../lib/utils";
import {FavoriteType} from "../../../Favorite/Types/FavoriteType";
import {PostCommentStatusEnumType} from "../../../Post/Types/PostCommentStatusEnumType";
import {TagType} from "../../../Tag/Types/TagType";
import {ProductTypeType} from "../ProductType/ProductTypeType";
import {ProductVendorType} from "../ProductVendor/ProductVendorType";
import {ProductMasterMetaType} from "./ProductMasterMetaType";
import {ProductBranchType} from "./ProductBranchType";
import {MediaType} from "../../../Media/Types/MediaType";

@ObjectType('ProductMaster')
export class ProductMasterType {
    static model = ProductMasterModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên sản phẩm'})
    public name: string;

    @Field(returns => ProductMasterKindEnumType, {description: 'Loại sản phẩm'})
    public kind: string;

    @Field()
    public slug(@Root() parent): string {
        return Str.slug(parent.name);
    };

    @Field({description: 'Ảnh đại diện'})
    public avatar: string;

    @Field({description: 'Ảnh theo nhóm biến thể.'})
    public imageType: string;

    @Field(returns => ID)
    public thumbnailId: string;

    // todo chưa có thumbnail
    @Field(returns => MediaType)
    public thumbnail: MediaType;

    @Field(returns => HTML,{description: 'Mô tả ngắn',})
    public description(
        @Root() parent,
        @Arg('maxLength', returns => Int) maxLength: number,
        @Arg('format', returns => ContentFormatEnumType, {defaultValue: 'HTML'}) format: number,
        @Ctx() ctx
    ) {
        const args = {maxLength, format};

        return htmlField(parent.description, args);
    }

    @Field({description: 'Là sản phẩm nổi bật',})
    public isFeatured: boolean;

    @Field(returns => FavoriteType, {description: 'Yêu thích'})
    public favorite: FavoriteType;

    @Field({description: 'Lượt view'})
    public views: number;

    @Field({description: 'Số bình luận'})
    public commentCount: number;

    @Field(returns => PostCommentStatusEnumType,{description: 'Trạng thái được phép bình luận'})
    public commentStatus: string;

    @Field(returns => HTML, {description: 'Nội dung',})
    public content(
        @Root() parent,
        @Arg('maxLength', returns => Int) maxLength: number,
        @Arg('format', returns => ContentFormatEnumType, {defaultValue: 'HTML'}) format: number,
        @Ctx() ctx
    ) {
        const args = {maxLength, format};

        return htmlField(parent.content, args);
    }

    @Field(returns => [TagType],{description: 'Thẻ nhãn'})
    public tags: TagType[];

    @Field(returns => [ProductTypeType], {description: 'Danh mục'})
    public categories: string;

    @Field({description: 'Tồn kho',})
    public inventory(@Root() parent): number {
        if (!parent.inventory) {
            return 0;
        }
        return parent.inventory.$extras.total;
    }

    @Field(returns => ID, {description: 'ID Loại sản phẩm'})
    public productTypeId: string;

    @Field(returns => ID, {description: 'ID Nhà cung cấp'})
    public productVendorId: string;

    @Field(returns => ProductVendorType, {description: 'Nhà cung cấp'})
    public vendor: ProductVendorType;

    @Field({description: 'Tổng số sản phẩm nhánh',})
    public branchCount(@Root() parent): number{
        if (!parent.branchCount) {
            return 0;
        }

        return parent.branchCount.$extras.total;
    };

    //todo chưa có sản phẩm nhánh
    @Field(returns => [ProductBranchType], {description: 'Các sản phẩm nhánh'})
    public branches: string;

    //todo chưa có attribute
    @Field()
    public attributeGroups: string;

    @Field(returns => [ProductMasterMetaType], {description: 'Trường tùy chỉnh.'})
    public meta: ProductMasterMetaType[];

    @Field(returns => [ProductMasterMetaType], {description: 'Trường tùy chỉnh.'})
    public metaCustom: ProductMasterMetaType[];

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ProductMasterType);