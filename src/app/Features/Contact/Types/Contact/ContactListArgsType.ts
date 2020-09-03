import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { ContactFilterEnumType } from './ContactFilterEnumType';
import { ContactSortInputType } from './ContactSortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ContactListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ContactFilterEnumType))
    filter: FilterContract<typeof ContactFilterEnumType>

    @Field(returns => [ContactSortInputType], { description: 'order' })
    sortBy: ContactSortInputType

    where: any;

    order: any;
}