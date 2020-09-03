import { Field, ObjectType } from '@tngraphql/graphql';
import { TimestampScalarType } from '../TimestampScalarType';
import { DateTime } from 'luxon';
import PermissionModel from '../../../Models/PermissionModel';
import { registerPaginateType } from '../PaginateType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 10:05 AM
 */

@ObjectType('Permission')
export class PermissionType {
    static model = PermissionModel

    @Field()
    public id: number

    @Field()
    public name: string;

    @Field()
    public displayName: string;

    @Field()
    public description: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(PermissionType);