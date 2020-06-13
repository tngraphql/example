/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 6:45 PM
 */

import {registerEnumType} from "@tngraphql/graphql";

export enum SortEnumType {
    ASC = 'asc',
    DESC = 'desc',
    asc = 'asc',
    desc = 'desc',
}

registerEnumType(SortEnumType, {name: 'SortValue'});