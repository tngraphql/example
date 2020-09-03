import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { ProductMasterFilterEnumType } from './ProductMasterFilterEnumType';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { ProductMasterSortInputType } from './ProductMasterSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ProductMasterListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number;

    @Field(returns => filterType(ProductMasterFilterEnumType))
    filter: FilterContract<typeof ProductMasterFilterEnumType>

    @Field(returns => [ProductMasterSortInputType], { description: 'order' })
    sortBy: ProductMasterSortInputType

    where: any;

    order: any;
}