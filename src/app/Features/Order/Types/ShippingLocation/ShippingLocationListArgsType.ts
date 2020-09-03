/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ShippingLocationFilterEnumType } from './ShippingLocationFilterEnumType';
import { ShippingLocationSortInputType } from './ShippingLocationSortInputType';

@ArgsType()
export class ShippingLocationListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ShippingLocationFilterEnumType))
    filter: FilterContract<typeof ShippingLocationFilterEnumType>

    @Field(returns => [ShippingLocationSortInputType], { description: 'order' })
    sortBy: ShippingLocationSortInputType

    where: any;

    order: any;
}