import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { filterType } from '../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../Contracts/FilterContract';
import { CommentFilterEnumType } from './CommentFilterEnumType';
import { CommentSortInputType } from './CommentSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class CommentListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(CommentFilterEnumType))
    filter: FilterContract<typeof CommentFilterEnumType>

    @Field(returns => [CommentSortInputType], { description: 'order' })
    sortBy: CommentSortInputType

    where: any;

    order: any;
}