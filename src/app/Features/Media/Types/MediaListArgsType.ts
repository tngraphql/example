/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {FilterContract} from "../../../../Contracts/FilterContract";
import {filterType} from "../../../GraphQL/Types/FilterType";
import {MediaFilterEnumType} from "./MediaFilterEnumType";
import {MediaSortInputType} from "./MediaSortInputType";

@ArgsType()
export class MediaListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(MediaFilterEnumType))
    filter: FilterContract<typeof MediaFilterEnumType>

    @Field(returns => [MediaSortInputType],{description: 'order'})
    sortBy: MediaSortInputType

    @Field()
    folderName: string = null

    where: any;

    order: any;
}