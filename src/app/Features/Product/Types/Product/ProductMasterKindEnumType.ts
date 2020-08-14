/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerEnumType} from "@tngraphql/graphql";

enum ProductMasterKindEnumType {
    single = 'single',
    branch = 'branch',
    combo = 'combo',
}

registerEnumType(ProductMasterKindEnumType, {name: 'ProductKind'});

export {ProductMasterKindEnumType};