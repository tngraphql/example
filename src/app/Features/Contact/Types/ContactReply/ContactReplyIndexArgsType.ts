import {ArgsType, Field} from "@tngraphql/graphql";
import {filterType} from "../../../../GraphQL/Types/FilterType";
import {FilterContract} from "../../../../../Contracts/FilterContract";
import {ContactReplyFilterEnumType} from "./ContactReplyFilterEnumType";
import {ContactReplySortInputType} from "./ContactReplySortInputType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ContactReplyIndexArgsType {
    @Field(returns => filterType(ContactReplyFilterEnumType))
    filter: FilterContract<typeof ContactReplyFilterEnumType>

    @Field(returns => [ContactReplySortInputType], {description: 'order'})
    sortBy: ContactReplySortInputType

    where: any;

    order: any;
}