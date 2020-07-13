/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */


import {registerFilterEnumType} from "../../../GraphQL/Types/FilterType";

enum FavoriteFilterEnumType {
    id = 'id',
    favoriteableId = 'favoriteableId',
    favoriteableType = 'favoriteableType',
    userId = 'userId',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
}

registerFilterEnumType('Favorite', FavoriteFilterEnumType);

export {FavoriteFilterEnumType};