/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:34 AM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { ShippingLocationFilterEnumType } from './ShippingLocationFilterEnumType';
import { ShippingLocationSortInputType } from './ShippingLocationSortInputType';

@ArgsType()
export class ShippingLocationIndexArgsType {
    @Field(returns => filterType(ShippingLocationFilterEnumType))
    filter: FilterContract<typeof ShippingLocationFilterEnumType>

    @Field(returns => [ShippingLocationSortInputType], { description: 'order' })
    sortBy: ShippingLocationSortInputType

    where: any;

    order: any;
}