/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:01 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {GENDER, UserModel} from "../../../UserModel";

@ArgsType()
export class UserResetPasswordArgsType {
    @Field({description: 'Token'})
    @Rules([
        'required',
        'string'
    ])
    public token: string

    @Field({description: 'E-Mail Address'})
    @Rules([
        'required',
        'email'
    ])
    public email: string

    @Field({description: 'Mật khẩu'})
    @Rules(args => {
        args.password_confirmation = args.passwordConfirmation;
        return [
            'required',
            'string',
            'between:6,32',
            'confirmed'
        ]
    }, ({lang}) => ({
        'confirmed': lang.t('Retype the password incorrectly.')
    }))
    public password: string

    @Field({description: 'Nhập lại mật khẩu'})
    @Rules([
        'required',
        'string',
        'between:6,32'
    ])
    public passwordConfirmation: string

}
