import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { ProductBranchFilterEnumType } from './ProductBranchFilterEnumType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ProductBranchSortInputType } from './ProductBranchSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ProductBranchListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number;

    @Field(returns => filterType(ProductBranchFilterEnumType))
    filter: FilterContract<typeof ProductBranchFilterEnumType>

    @Field(returns => [ProductBranchSortInputType], { description: 'order' })
    sortBy: ProductBranchSortInputType

    where: any;

    order: any;
}