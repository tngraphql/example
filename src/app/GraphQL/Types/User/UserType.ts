import { Field, ObjectType } from '@tngraphql/graphql';
import { UserModel } from '../../../UserModel';
import { registerPaginateType } from '../PaginateType';
import { RoleType } from '../Role/RoleType';
import { DateTime } from 'luxon';
import { TimestampScalarType } from '../TimestampScalarType';
import { ID } from '../UidScalerType';
import { GenderEnumType } from '../GenderEnumType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:06 PM
 */

@ObjectType('User')
export class UserType {
    static model = UserModel;

    @Field(returns => ID)
    id: number

    @Field({ description: 'Token login.' })
    public token?: string

    @Field({ description: 'Số điện thoại' })
    public phone: string;

    @Field({ description: 'Họ và Tên' })
    public name: string;

    @Field(returns => [RoleType], { description: 'Quyền' })
    roles: RoleType[]

    @Field({ description: 'Ảnh đại diện' })
    public avatar: string;

    @Field(returns => TimestampScalarType, { description: 'Ngày sinh' })
    public dob: DateTime;

    @Field({ description: 'Email người dùng' })
    public email: string;

    @Field(returns => GenderEnumType, { description: 'Giới tính' })
    public gender: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime;

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime;

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime;
}

registerPaginateType(UserType);