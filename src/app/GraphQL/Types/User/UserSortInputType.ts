/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:08 PM
 */

import {Field, InputType} from "@tngraphql/graphql";
import {SortEnumType} from "../SortEnumType";

@InputType('SortUser')
export class UserSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    name: SortEnumType

    resolveId() {
        return 'id';
    }
}