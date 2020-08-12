/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ProductTypeModel} from "../../Models/ProductTypeModel";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import {ProductTypeMetaType} from "./ProductTypeMetaType";
import {ProductTypeOtherLanguageType} from "./ProductTypeOtherLanguageType";

@ObjectType('ProductType')
export class ProductTypeType {
    static model = ProductTypeModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên danh mục'})
    public name: string;

    // You need to provide explicit type for ProductTypeType#productCount
    @Field({description: 'Số lượng sản phẩm trên danh mục'})
    public productCount(@Root() parent): number {
        if (!parent.productCount) {
            return 0;
        }

        return parent.productCount.$extras.total;
    }

    @Field({description: 'Mô tả danh mục'})
    public description: string;

    @Field(returns => ID, {description: 'Danh mục cha'})
    public parentId: string;

    @Field()
    public slug: string;

    @Field(returns => Int, {description: 'Sắp xếp'})
    public categoryOrder: number;

    @Field()
    public seoTitle: string;

    @Field()
    public seoDescription: string;

    @Field()
    public seoKeyword: string;

    @Field(returns => [ProductTypeMetaType])
    public meta: ProductTypeMetaType[];

    @Field(returns => ID)
    public language: string;

    @Field(returns => ID)
    public languageMaster: string;

    @Field(returns => [ProductTypeOtherLanguageType], { description: 'Những ngôn ngữ khác' })
    public otherLanguages: ProductTypeOtherLanguageType[];

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ProductTypeType);