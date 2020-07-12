/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('App/Features/Contact/ContactModel', (faker, index, data) => {
    return {
        name: faker.name(),
        email: faker.email(),
        phone: faker.phone(),
        address: faker.name(),
        content: faker.name(),
        subject: faker.name(),
        status: data.status || 'unRead'
    }
});