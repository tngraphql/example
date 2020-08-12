import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ProductVendorFilterEnumType} from "./ProductVendorFilterEnumType";
import {ProductVendorSortInputType} from "./ProductVendorSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ProductVendorListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ProductVendorFilterEnumType))
    filter: FilterContract<typeof ProductVendorFilterEnumType>

    @Field(returns => [ProductVendorSortInputType],{description: 'order'})
    sortBy: ProductVendorSortInputType

    where: any;

    order: any;
}