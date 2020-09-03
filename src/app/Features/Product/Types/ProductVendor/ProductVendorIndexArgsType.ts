import { ArgsType, Field } from '@tngraphql/graphql';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ProductVendorFilterEnumType } from './ProductVendorFilterEnumType';
import { ProductVendorSortInputType } from './ProductVendorSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ProductVendorIndexArgsType {
    @Field(returns => filterType(ProductVendorFilterEnumType))
    filter: FilterContract<typeof ProductVendorFilterEnumType>

    @Field(returns => [ProductVendorSortInputType], { description: 'order' })
    sortBy: ProductVendorSortInputType

    where: any;

    order: any;
}