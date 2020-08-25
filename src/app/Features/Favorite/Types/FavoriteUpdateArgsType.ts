import {ArgsType, Field} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import FavoriteModel from "../FavoriteModel";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {FavoriteTypeEnumType} from "./FavoriteTypeEnumType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class FavoriteUpdateArgsType {
    @Field(returns => ID, {description: 'ID'})
    @Rules([
        'required',
        Rule.exists(FavoriteModel.getTable(), 'id')
    ])
    public id: string

    @Field(returns => ID)
    public favoriteableId: string

    @Field(returns => FavoriteTypeEnumType)
    public favoriteableType: string

    @Field(returns => ID)
    public userId: string
}