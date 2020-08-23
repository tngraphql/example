/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('post_category', async (faker, index, data) => {
    let post_id = data.post_id;
    let category_id = data.category_id;

    if (!post_id) {
        const post = await Factory.model('App/Features/Post/PostModel').create();
        post_id = post.id;
    }

    if (!category_id) {
        const category = await Factory.model('App/Features/Category/CategoryModel').create();
        category_id = category.id;
    }

    return {
        post_id,
        category_id,
    }
});