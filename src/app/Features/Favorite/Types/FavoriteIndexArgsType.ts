import {ArgsType, Field} from "@tngraphql/graphql";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {FavoriteFilterEnumType} from "./FavoriteFilterEnumType";
import {FavoriteSortInputType} from "./FavoriteSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class FavoriteIndexArgsType {
    @Field(returns => filterType(FavoriteFilterEnumType))
    filter: FilterContract<typeof FavoriteFilterEnumType>

    @Field(returns => [FavoriteSortInputType], {description: 'order'})
    sortBy: FavoriteSortInputType

    where: any;

    order: any;
}