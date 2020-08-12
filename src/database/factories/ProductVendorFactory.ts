/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';

Factory.blueprint('App/Features/Product/Models/ProductVendorModel', (faker, index, data) => {
    return {
        name: faker.name()
    }
});