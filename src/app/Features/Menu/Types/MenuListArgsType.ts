import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { filterType } from '../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../Contracts/FilterContract';
import { MenuFilterEnumType } from './MenuFilterEnumType';
import { MenuSortInputType } from './MenuSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class MenuListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(MenuFilterEnumType))
    filter: FilterContract<typeof MenuFilterEnumType>

    @Field(returns => [MenuSortInputType], { description: 'order' })
    sortBy: MenuSortInputType

    where: any;

    order: any;
}