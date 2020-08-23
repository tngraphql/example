/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/25/2020
 * Time: 9:06 PM
 */
import {ArgsType, Field} from "@tngraphql/graphql";
import {args, Rules} from "@tngraphql/illuminate";
import {GenderEnumType} from "../GenderEnumType";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {UserModel} from "../../../UserModel";
import {ID} from "../UidScalerType";
import RoleModel from "../../../Models/RoleModel";

@ArgsType()
export class UserChangePasswordArgsType {
    @Field({description: 'Mật khẩu cũ'})
    @Rules(
        async (args, {auth}) => ([
            'required',
            'string',
            'between:6,32',
            'compare_password:' + (await auth.user()).email
        ]),
        ({lang}) => ({
            // 'Mật khẩu cũ không chính xác.'
            compare_password: lang.t('Old password is incorrect.'),
            // 'Mật khẩu mới không được trùng với mật khẩu cũ.'
            not_in: lang.t('The new password must not match the old password.'),
            // 'Nhập lại mật khẩu không chính xác.'
            confirmed: lang.t('Retype the password incorrectly.')
        })
    )
    public oldPassword: string;

    @Field({description: 'Mật khẩu mới'})
    @Rules(args => ([
        'required',
        'string',
        'between:6,32',
        'confirmed',
        Rule.notIn([args.oldPassword])
    ]))
    public password: string;

    @Field({description: 'Nhập lại mật khẩu mới'})
    @Rules([
        'required',
        'string',
        'between:6,32'
    ])
    public passwordConfirmation: string;
}