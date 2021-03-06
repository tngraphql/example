import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../GraphQL/Types/SortEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('MenuSort')
export class MenuSortInputType {
    @Field(returns => SortEnumType)
    public id: SortEnumType

    @Field(returns => SortEnumType)
    public name: SortEnumType

    @Field(returns => SortEnumType)
    public status: SortEnumType

    @Field(returns => SortEnumType)
    public description: SortEnumType

    @Field(returns => SortEnumType)
    public language: SortEnumType

    @Field(returns => SortEnumType)
    public languageMaster: SortEnumType

    @Field(returns => SortEnumType)
    public createdAt: SortEnumType

    @Field(returns => SortEnumType)
    public updatedAt: SortEnumType

    @Field(returns => SortEnumType)
    public deletedAt: SortEnumType
}
