import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../../../GraphQL/Types/SortEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('LanguageSort')
export class LanguageSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public name: SortEnumType

    @Field(returns => SortEnumType)
    public locale: SortEnumType

    @Field(returns => SortEnumType)
    public code: SortEnumType

    @Field(returns => SortEnumType)
    public direction: SortEnumType

    @Field(returns => SortEnumType)
    public flag: SortEnumType

    @Field(returns => SortEnumType)
    public position: SortEnumType

    @Field(returns => SortEnumType)
    public default: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType
}
