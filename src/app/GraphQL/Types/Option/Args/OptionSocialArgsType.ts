/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:59 AM
 */
import { ArgsType, Field } from '@tngraphql/graphql';

@ArgsType()
export class OptionSocialArgsType {

    @Field({ description: 'Configure social login options', })
    public socialLogin: boolean

    @Field({ description: 'Enable/disable & configure app credentials for Facebook login', })
    public facebookLoginEnable: boolean

    @Field({ description: 'Facebook Client ID' })
    public facebookClientId: string

    @Field({ description: 'Facebook Client Secret' })
    public facebookClientSecret: string

    @Field({ description: 'Facebook Scopes' })
    public facebookScopes: string

    @Field({ description: 'Facebook Redirect URL' })
    public facebookRedirectURL: string

    @Field({ description: 'Enable/disable & configure app credentials for Google login', })
    public googleLoginEnable: boolean

    @Field({ description: 'Google Client ID' })
    public googleClientId: string

    @Field({ description: 'Google Client Secret' })
    public googleClientSecret: string

    @Field({ description: 'Google Scopes' })
    public googleScopes: string

    @Field({ description: 'Google Redirect URL' })
    public googleRedirectURL: string

    @Field({ description: 'Enable/disable & configure app credentials for Github login', })
    public githubLoginEnable: boolean

    @Field({ description: 'Github Client ID' })
    public githubClientId: string

    @Field({ description: 'Github Client Secret' })
    public githubClientSecret: string

    @Field({ description: 'Github Scopes' })
    public githubScopes: string

    @Field({ description: 'Github Redirect' })
    public githubRedirectURL: string

    @Field({ description: 'Auto-register users?', })
    public autoRegister: boolean

    @Field({ description: 'Registration disabled message' })
    public autoRegisterDisabledMessage: string

    @Field({ description: 'Universal Role' })
    public socialRegisterRole: string
}