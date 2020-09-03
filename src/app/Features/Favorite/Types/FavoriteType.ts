import { Field, ObjectType } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import FavoriteModel from '../FavoriteModel';
import { TimestampScalarType } from '../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../GraphQL/Types/PaginateType';
import { FavoriteTypeEnumType } from './FavoriteTypeEnumType';
import { UserType } from '../../../GraphQL/Types/User/UserType';
import { ProductMasterType } from '../../Product/Types/Product/ProductMasterType';
/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import { PostType } from '../../Post/Types/Post/PostType';
import { PageType } from '../../Post/Types/Page/PageType';

@ObjectType('Favorite')
export class FavoriteType {
    static model = FavoriteModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID)
    public favoriteableId: string;

    @Field(returns => FavoriteTypeEnumType)
    public favoriteableType: string;

    @Field(returns => ProductMasterType)
    public product: ProductMasterType

    @Field(returns => PostType)
    public post: PostType

    @Field(returns => PageType)
    public page: PageType

    @Field(returns => ID)
    public userId: string;

    @Field(returns => UserType)
    public user: UserType

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(FavoriteType);