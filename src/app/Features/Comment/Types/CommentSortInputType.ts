import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('CommentSort')
export class CommentSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public body: SortEnumType

    @Field(returns => SortEnumType)
    public authorId: SortEnumType

    @Field(returns => SortEnumType)
    public publishedAt: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType
}
