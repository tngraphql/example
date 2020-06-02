/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 6:14 PM
 */

export interface GroupContract<T = any> {
    operator: string;
    items: FilterContract<T>[]
}

export interface FilterContract<T = any> {
    operator: string;

    value?: any;

    groups?: GroupContract<T>[]

    field?: T

    items?: FilterContract<T>[]
}