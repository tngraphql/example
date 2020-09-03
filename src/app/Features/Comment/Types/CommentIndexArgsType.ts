import { ArgsType, Field } from '@tngraphql/graphql';
import { FilterContract } from '../../../../Contracts/FilterContract';
import { filterType } from '../../../GraphQL/Types/FilterType';
import { CommentSortInputType } from './CommentSortInputType';
import { CommentFilterEnumType } from './CommentFilterEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class CommentIndexArgsType {
    @Field(returns => filterType(CommentFilterEnumType))
    filter: FilterContract<typeof CommentFilterEnumType>

    @Field(returns => [CommentSortInputType], { description: 'order' })
    sortBy: CommentSortInputType

    where: any;

    order: any;
}