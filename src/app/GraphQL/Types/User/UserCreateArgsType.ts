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

@ArgsType()
export class UserCreateArgsType {
    @Field({ description: 'Họ và Tên' })
    @Rules([
        'required',
        'between:3,100'
    ])
    public name: string

    @Field({ description: 'Ảnh đại diện' })
    public avatar: string

    // @ts-ignore
    @Field(returns => GenderEnumType, { description: 'giới tính: 1-Nam, 2-Nữ', defaultValue: '1' })
    public gender: GenderEnumType

    @Field({ description: 'số điện thoại' })
    @Rules([
        'between:9,10',
        'regex:/^[0-9]+$/',
        Rule.unique(UserModel.getTable(), 'phone')
    ], ({ lang }) => ({
        'between': lang.t('Phone format is invalid.')
    }))
    public phone: string

    @Field({ description: 'Mật khẩu đăng nhập' })
    @Rules([
        'required',
        'string',
        'between:6,32'
    ])
    public password: string

    @Field({ description: 'Email đăng ký' })
    @Rules([
        'required',
        'email',
        Rule.unique(UserModel.getTable(), 'email')
    ])
    public email: string

    @Field(returns => [ID], { description: 'Thuộc Role' })
    @Rules([
        'required',
        Rule.exists(RoleModel.getTable(), 'id')
    ])
    public roles: string
}