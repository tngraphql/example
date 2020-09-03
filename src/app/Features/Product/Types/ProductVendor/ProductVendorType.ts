/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import { Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../../GraphQL/Types/PaginateType';
import { ProductVendorModel } from '../../Models/ProductVendorModel';

@ObjectType('ProductVendor')
export class ProductVendorType {
    static model = ProductVendorModel

    @Field(returns => ID)
    public id: string

    @Field({ description: 'Tên nhà cung cấp' })
    public name: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ProductVendorType);