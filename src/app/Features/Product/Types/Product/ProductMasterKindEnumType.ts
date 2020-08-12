/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";

enum ProductMasterKindEnumType {
    single = 'single',
    branch = 'branch',
    combo = 'combo',
}

registerFilterEnumType('ProductKind', ProductMasterKindEnumType);

export {ProductMasterKindEnumType};