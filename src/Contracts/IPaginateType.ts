/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 8:09 PM
 */

export interface IPaginateType<Result extends any = any> {
    from?: number
    to?: number
    perPage?: number
    currentPage?: number
    total?: number
    data?: Result[]
}