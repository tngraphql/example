/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

const ListFavoriteableId = [];

Factory.blueprint('App/Features/Favorite/FavoriteModel', (faker, index, data) => {
    if (!ListFavoriteableId.length || data.reload) {
        ListFavoriteableId.length = 0;
        ListFavoriteableId.push.apply(ListFavoriteableId, faker.unique(faker.integer, 20, {min: 0, max: 100}));
    }

    return {
        favoriteableId: String(data.favoriteableId || ListFavoriteableId.pop()),
        favoriteableType: data.favoriteableType || 'post',
        userId: String(data.userId || '1')
    }
});