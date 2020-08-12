import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {ProductTypeFilterEnumType} from "./ProductTypeFilterEnumType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ProductTypeSortInputType} from "./ProductTypeSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ProductTypeListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => filterType(ProductTypeFilterEnumType))
    filter: FilterContract<typeof ProductTypeFilterEnumType>

    @Field(returns => [ProductTypeSortInputType],{description: 'order'})
    sortBy: ProductTypeSortInputType

    where: any;

    order: any;
}