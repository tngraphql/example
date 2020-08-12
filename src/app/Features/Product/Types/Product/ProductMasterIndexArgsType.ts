import {ArgsType, Field} from "@tngraphql/graphql";
import {ProductMasterFilterEnumType} from "./ProductMasterFilterEnumType";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ProductMasterSortInputType} from "./ProductMasterSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ProductMasterIndexArgsType {
    @Field(returns => filterType(ProductMasterFilterEnumType))
    filter: FilterContract<typeof ProductMasterFilterEnumType>

    @Field(returns => [ProductMasterSortInputType], {description: 'order'})
    sortBy: ProductMasterSortInputType

    where: any;

    order: any;
}