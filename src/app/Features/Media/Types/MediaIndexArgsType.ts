/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { filterType } from '../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../Contracts/FilterContract';
import { MediaFilterEnumType } from './MediaFilterEnumType';
import { MediaSortInputType } from './MediaSortInputType';

@ArgsType()
export class MediaIndexArgsType {
    @Field(returns => filterType(MediaFilterEnumType))
    filter: FilterContract<typeof MediaFilterEnumType>

    @Field(returns => [MediaSortInputType], { description: 'order' })
    sortBy: MediaSortInputType

    where: any;

    order: any;
}