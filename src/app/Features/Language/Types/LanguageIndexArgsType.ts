import {ArgsType, Field} from "@tngraphql/graphql";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {LanguageFilterEnumType} from "./LanguageFilterEnumType";
import {LanguageSortInputType} from "./LanguageSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class LanguageIndexArgsType {
    @Field(returns => filterType(LanguageFilterEnumType))
    filter: FilterContract<typeof LanguageFilterEnumType>

    @Field(returns => [LanguageSortInputType], {description: 'order'})
    sortBy: LanguageSortInputType

    where: any;

    order: any;
}