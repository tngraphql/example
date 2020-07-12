/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('App/Features/Contact/ContactReplyModel', (faker, index, data: any = {}) => {
    return {
        message: faker.word(),
        contactId: String(data.id || faker.unique(faker.integer, 1, {min: 0, max: 100}).pop())
    }
});