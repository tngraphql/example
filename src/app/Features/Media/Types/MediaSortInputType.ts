/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../GraphQL/Types/SortEnumType';

@InputType('MediaSort')
export class MediaSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    status: SortEnumType

    @Field(returns => SortEnumType)
    title: SortEnumType

    @Field(returns => SortEnumType)
    guid: SortEnumType

    @Field(returns => SortEnumType)
    src: SortEnumType

    @Field(returns => SortEnumType)
    rootId: SortEnumType

    @Field(returns => SortEnumType)
    filesize: SortEnumType

    @Field(returns => SortEnumType)
    mineType: SortEnumType

    @Field(returns => SortEnumType)
    data: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType
}
