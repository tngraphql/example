import { ArgsType, Field } from '@tngraphql/graphql';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ProductBranchFilterEnumType } from './ProductBranchFilterEnumType';
import { ProductBranchSortInputType } from './ProductBranchSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:56 PM
 */

@ArgsType()
export class ProductBranchIndexArgsType {
    @Field(returns => filterType(ProductBranchFilterEnumType))
    filter: FilterContract<typeof ProductBranchFilterEnumType>

    @Field(returns => [ProductBranchSortInputType], { description: 'order' })
    sortBy: ProductBranchSortInputType

    where: any;

    order: any;
}