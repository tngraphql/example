import { Field, InputType } from '@tngraphql/graphql';
import { SortEnumType } from '../../../../GraphQL/Types/SortEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */

@InputType('ContactSort')
export class ContactSortInputType {
    @Field(returns => SortEnumType)
    id: SortEnumType

    @Field(returns => SortEnumType)
    public name: SortEnumType

    @Field(returns => SortEnumType)
    public email: SortEnumType

    @Field(returns => SortEnumType)
    public phone: SortEnumType

    @Field(returns => SortEnumType)
    public address: SortEnumType

    @Field(returns => SortEnumType)
    public content: SortEnumType

    @Field(returns => SortEnumType)
    public subject: SortEnumType

    @Field(returns => SortEnumType)
    public status: SortEnumType

    @Field(returns => SortEnumType)
    createdAt: SortEnumType

    @Field(returns => SortEnumType)
    updatedAt: SortEnumType
}
