/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import { DateTime } from 'luxon';
import { CommentStatusEnumType } from '../../app/Features/Comment/Types/CommentStatusEnumType';

Factory.blueprint('App/Features/Comment/CommentModel', (faker, index, data) => {
    return {
        authorName: faker.name(),
        authorEmail: faker.email(),
        authorUrl: '',
        authorIp: '',
        authorId: data.authorId || '1',
        parentId: data.parentId || '0',
        body: data.body || faker.name(),
        status: data.status || CommentStatusEnumType.pending,
        commentableType: data.commentableType || 'post',
        commentableId: data.commentableId || '1',
        publishedAt: data.publishedAt || DateTime.local(),
    }
});