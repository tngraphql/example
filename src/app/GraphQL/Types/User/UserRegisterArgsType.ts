/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:01 AM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { UserModel } from '../../../UserModel';
import { GenderEnumType } from '../GenderEnumType';

@ArgsType()
export class UserRegisterArgsType {
    @Field({ description: 'Họ và Tên', nullable: false })
    @Rules([
        'required',
        'between:3,100'
    ])
    public name: string;

    @Field(returns => Int, { description: 'giới tính: 1-Nam, 2-Nữ', defaultValue: 1 })
    @Rules([
        'in:1,2'
    ])
    public gender: GenderEnumType;

    @Field({ description: 'số điện thoại' })
    @Rules([
        'between:9,10',
        'regex:/^[0-9]+$/',
        Rule.unique(UserModel.getTable(), 'phone')
    ], ({ lang }) => ({
        'between': lang.t('Phone format is invalid.')
    }))
    public phone: string;

    @Field({ description: 'Mật khẩu đăng nhập', nullable: false })
    @Rules([
        'required',
        'string',
        'between:6,32'
    ])
    public password: string;

    @Field({ description: 'Email đăng ký', nullable: false })
    @Rules([
        'required',
        'email',
        Rule.unique(UserModel.getTable(), 'email')
    ])
    public email: string;

}
