/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../GraphQL/Types/SortEnumType";

@InputType('TagSort')
export class TagSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    name: SortEnumType

    @Field(returns => SortEnumType)
    slug: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType
}
