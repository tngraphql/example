/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:06 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { GenderEnumType } from '../GenderEnumType';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { UserModel } from '../../../UserModel';
import { ID } from '../UidScalerType';
import RoleModel from '../../../Models/RoleModel';
import { Timestamp } from '../TimestampScalarType';
import { DateTime } from 'luxon';

@ArgsType()
export class UserUpdateArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(UserModel.getTable(), 'id')
    ])
    public id: string

    @Field({ description: 'Họ và Tên' })
    @Rules([
        'filled',
        'between:3,100'
    ])
    public name: string

    @Field({ description: 'Ảnh đại diện' })
    public avatar: string

    @Field(returns => GenderEnumType, { description: 'giới tính: 1-Nam, 2-Nữ', defaultValue: '1' })
    public gender: GenderEnumType

    @Field({ description: 'số điện thoại' })
    @Rules(args => ([
        'between:9,10',
        'regex:/^[0-9]+$/',
        Rule.unique(UserModel.getTable(), 'phone').ignore(args.id)
    ]), ({ lang }) => ({
        'between': lang.t('Phone format is invalid.')
    }))
    public phone: string

    @Field(returns => Timestamp, { description: 'Ngày sinh thần' })
    public dob: DateTime

    @Field(returns => [ID], { description: 'Thuộc Role' })
    @Rules([
        'filled',
        Rule.exists(RoleModel.getTable(), 'id')
    ], ({ lang }) => ({
        'filled': lang.t('Please select a role.')
    }))
    public roles: string[];

    @Field({ description: 'Mật khẩu đăng nhập' })
    @Rules([
        'string',
        'between:6,32'
    ])
    public password: string
}