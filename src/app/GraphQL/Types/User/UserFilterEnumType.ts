/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:07 PM
 */
import {registerFilterEnumType} from "../FilterType";

enum UserFilterEnumType {
    id = 'id',
    // value = '123'
}

namespace UserFilterEnumType {
    export const value = () => {
        return '4343';
    }
}

registerFilterEnumType('User', UserFilterEnumType);

export {UserFilterEnumType}