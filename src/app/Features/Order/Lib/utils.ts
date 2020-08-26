/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 3:13 PM
 */
export function convertStringToNumber(value) {
    if ( ! value ) {
        return 0;
    }
    value = (value + '').replace(/[^0-9+\-Ee.]/g, '');
    return parseFloat(value) || 0;
}