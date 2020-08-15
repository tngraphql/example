import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('ProductBranchSort')
export class ProductBranchSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public sku: SortEnumType;

    @Field(returns => SortEnumType)
    public code: SortEnumType;

    @Field(returns => SortEnumType)
    public isMaster: SortEnumType;

    @Field(returns => SortEnumType)
    public fullname: SortEnumType;

    @Field(returns => SortEnumType)
    public unitValue: SortEnumType;

    @Field(returns => SortEnumType)
    public unitName: SortEnumType;

    @Field(returns => SortEnumType)
    public productMasterId: SortEnumType;

    @Field(returns => SortEnumType)
    public productTypeId: SortEnumType;

    @Field(returns => SortEnumType)
    public price: SortEnumType;

    @Field(returns => SortEnumType)
    public priceSale: SortEnumType;

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType;

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType;

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType;
}
