/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('App/Features/Product/Models/ProductTypeModel', (faker, index, data) => {
    return {
        name: faker.name(),
        description: faker.name(),
        parentId: data.parentId || '0',
        language: data.language || '1',
        categoryOrder: data.categoryOrder || '0',
        seoTitle: faker.name(),
        seoDescription: faker.name(),
        seoKeyword: faker.name()
    }
});