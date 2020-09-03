import { ArgsType, Field } from '@tngraphql/graphql';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { PageFilterEnumType } from './PageFilterEnumType';
import { PageSortInputType } from './PageSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class PageIndexArgsType {
    @Field(returns => filterType(PageFilterEnumType))
    filter: FilterContract<typeof PageFilterEnumType>

    @Field(returns => [PageSortInputType], { description: 'order' })
    sortBy: PageSortInputType

    where: any;

    order: any;
}