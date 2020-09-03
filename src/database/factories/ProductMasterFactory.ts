/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import { ProductMasterKindEnumType } from '../../app/Features/Product/Types/Product/ProductMasterKindEnumType';

Factory.blueprint('App/Features/Product/Models/ProductMasterModel', (faker, index, data) => {
    return {
        name: data.name || faker.name(),
        kind: data.kind || ProductMasterKindEnumType.single
    }
});