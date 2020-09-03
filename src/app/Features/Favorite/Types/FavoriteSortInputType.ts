import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../GraphQL/Types/SortEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('FavoriteSort')
export class FavoriteSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    public favoriteableId: SortEnumType

    @Field(returns => SortEnumType)
    public favoriteableType: SortEnumType

    @Field(returns => SortEnumType)
    public userId: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType
}
