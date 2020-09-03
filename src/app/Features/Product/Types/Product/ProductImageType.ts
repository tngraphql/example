/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 9:40 AM
 */
import { Field, Int, ObjectType } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { AttributeModel } from '../../Models/AttributeModel';
import { MediaType } from '../../../Media/Types/MediaType';
import { TimestampScalarType } from '../../../../GraphQL/Types/TimestampScalarType';
import { DateTime } from 'luxon';

@ObjectType('ProductImage')
export class ProductImageType {
    static model = AttributeModel

    @Field(returns => ID)
    public id: string;

    @Field(returns => ID)
    public productMasterId: string;

    @Field(returns => ID)
    public productBranchId: string;

    @Field({ description: 'Tên loại' })
    public image: string;

    @Field(returns => ID, {})
    public thumbnailId: string;

    @Field(returns => MediaType, {})
    public thumbnail: string;

    @Field(returns => Int, { description: 'Tên loại' })
    public sortOrder: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}