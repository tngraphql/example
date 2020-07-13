import {Field, ObjectType} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import FavoriteModel from "../FavoriteModel";
import {TimestampScalarType} from "../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../GraphQL/Types/PaginateType";
import {FavoriteTypeEnum} from "./FavoriteTypeEnum";
import {UserType} from "../../../GraphQL/Types/User/UserType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Favorite')
export class FavoriteType {
    static model = FavoriteModel

    @Field(returns => ID)
    public id: string

    @Field(returns => ID)
    public favoriteableId: string;

    @Field(returns => FavoriteTypeEnum)
    public favoriteableType: string;

    @Field(returns => UserType)
    public product: UserType

    @Field(returns => UserType)
    public post: UserType

    @Field(returns => UserType)
    public page: UserType

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