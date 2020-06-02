/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/29/2020
 * Time: 7:43 AM
 */

export interface ISelection {
    columns: string[]
    preloads?: IRelation[];
}

export interface IRelation {
    name: string
    columns?: string[]
    preloads?: IRelation[]
}