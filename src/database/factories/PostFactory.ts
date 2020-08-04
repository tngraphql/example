/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import {DateTime} from "luxon";

Factory.blueprint('App/Features/Post/PostModel', (faker, index, data) => {
    return {
        name: faker.name(),
        authorId: data.authorId || 1,
        parentId: data.parentId || '0',
        type: 'post',
        description: faker.name(),
        content: faker.name(),
        postStatus: data.postStatus || 'publish',
        commentStatus: data.commentStatus || 'open',
        commentCount: data.commentCount || '0',
        format: data.format || '1',
        thumbnailId: data.thumbnailId || '1',
        isFeatured: data.isFeatured || '0',
        publishedAt: data.publishedAt || DateTime.local(),
        views: data.views || '0',
        seoTitle: faker.name(),
        seoDescription: faker.name(),
        seoKeyword: faker.name()
    }
});