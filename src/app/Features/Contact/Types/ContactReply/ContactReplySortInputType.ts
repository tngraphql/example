import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('ContactReplySort')
export class ContactReplySortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    public message: SortEnumType

    @Field(returns => SortEnumType)
    public contactId: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType
}
