/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import {registerEnumType} from "@tngraphql/graphql";

enum MenuStatusEnumType {
    publish = 'publish', // Xuất bản
    draft = 'draft', // 'Nháp'
    pending = 'pending', // Đang sửa
}

registerEnumType(MenuStatusEnumType, {
    name: 'MenuStatusEnum',
    description: 'Trạng thái menu'
});

export {MenuStatusEnumType};