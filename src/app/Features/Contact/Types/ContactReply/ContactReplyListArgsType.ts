import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { FilterContract } from '../../../../../Contracts/FilterContract';
import { filterType } from '../../../../GraphQL/Types/FilterType';
import { ContactReplyFilterEnumType } from './ContactReplyFilterEnumType';
import { ContactReplySortInputType } from './ContactReplySortInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:42 AM
 */

@ArgsType()
export class ContactReplyListArgsType {
    @Field(returns => Int)
    page: number;

    @Field(returns => Int)
    limit: number = 20;

    @Field(returns => filterType(ContactReplyFilterEnumType))
    filter: FilterContract<typeof ContactReplyFilterEnumType>

    @Field(returns => [ContactReplySortInputType], { description: 'order' })
    sortBy: ContactReplySortInputType

    where: any;

    order: any;
}