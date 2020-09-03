import { ArgsType, Field } from '@tngraphql/graphql';
import { FilterContract } from '../../../../Contracts/FilterContract';
import { filterType } from '../../../GraphQL/Types/FilterType';
import { MenuFilterEnumType } from './MenuFilterEnumType';
import { MenuSortInputType } from './MenuSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class MenuIndexArgsType {
    @Field(returns => filterType(MenuFilterEnumType))
    filter: FilterContract<typeof MenuFilterEnumType>

    @Field(returns => [MenuSortInputType], { description: 'order' })
    sortBy: MenuSortInputType

    where: any;

    order: any;
}