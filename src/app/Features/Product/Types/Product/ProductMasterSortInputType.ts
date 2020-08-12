import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('ProductMasterSort')
export class ProductMasterSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public name: SortEnumType;

    @Field(returns => SortEnumType)
    public description: SortEnumType;

    @Field(returns => SortEnumType)
    public isFeatured: SortEnumType;

    @Field(returns => SortEnumType)
    public views: SortEnumType;

    @Field(returns => SortEnumType)
    public commentStatus: SortEnumType;

    @Field(returns => SortEnumType)
    public commentCount: SortEnumType;

    @Field(returns => SortEnumType)
    public inventory: SortEnumType;

    @Field(returns => SortEnumType)
    public content: SortEnumType;

    @Field(returns => SortEnumType)
    public productTypeId: SortEnumType;

    @Field(returns => SortEnumType)
    public productVendorId: SortEnumType;

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType;

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType;

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType;
}
