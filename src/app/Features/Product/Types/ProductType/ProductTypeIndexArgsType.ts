import { ArgsType, Field } from '@tngraphql/graphql';
import { ProductTypeFilterEnumType } from './ProductTypeFilterEnumType';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ProductTypeSortInputType } from './ProductTypeSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ProductTypeIndexArgsType {
    @Field(returns => filterType(ProductTypeFilterEnumType))
    filter: FilterContract<typeof ProductTypeFilterEnumType>

    @Field(returns => [ProductTypeSortInputType], { description: 'order' })
    sortBy: ProductTypeSortInputType

    where: any;

    order: any;
}