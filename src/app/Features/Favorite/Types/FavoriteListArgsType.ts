import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {FavoriteFilterEnumType} from "./FavoriteFilterEnumType";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {FavoriteSortInputType} from "./FavoriteSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class FavoriteListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(FavoriteFilterEnumType))
    filter: FilterContract<typeof FavoriteFilterEnumType>

    @Field(returns => [FavoriteSortInputType],{description: 'order'})
    sortBy: FavoriteSortInputType

    where: any;

    order: any;
}