import {ArgsType, Field} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ContactFilterEnumType} from "./ContactFilterEnumType";
import {ContactSortInputType} from "./ContactSortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ContactIndexArgsType {
    @Field(returns => filterType(ContactFilterEnumType))
    filter: FilterContract<typeof ContactFilterEnumType>

    @Field(returns => [ContactSortInputType], {description: 'order'})
    sortBy: ContactSortInputType

    where: any;

    order: any;
}