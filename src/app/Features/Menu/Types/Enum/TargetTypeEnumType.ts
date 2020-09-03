/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import { registerEnumType } from '@tngraphql/graphql';

enum TargetTypeEnumType {
    blank = 'blank', // Mở cửa sổ mới
    self = 'self', // Mở liên kết trong chính khung hiện tại
    parent = 'parent', // Mở liên kết trong khung cha
    top = 'top', // Mở liên kết trong chính cửa sổ.
}

registerEnumType(TargetTypeEnumType, {
    name: 'TargetTypeEnum',
    description: 'Loại liên kết menu.'
});

export { TargetTypeEnumType };