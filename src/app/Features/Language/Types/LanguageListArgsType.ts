import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {LanguageFilterEnumType} from "./LanguageFilterEnumType";
import {LanguageSortInputType} from "./LanguageSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class LanguageListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(LanguageFilterEnumType))
    filter: FilterContract<typeof LanguageFilterEnumType>

    @Field(returns => [LanguageSortInputType],{description: 'order'})
    sortBy: LanguageSortInputType

    where: any;

    order: any;
}