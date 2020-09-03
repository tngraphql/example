/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/11/2020
 * Time: 2:41 PM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import {
    Arg,
    Args,
    ArgsType, Ctx,
    Field,
    FieldResolver,
    InputType,
    Mutation,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from '@tngraphql/graphql';
import { UserType } from '../Types/User/UserType';
import { GraphQLString } from 'graphql';
import { Inject, ValidateArgs } from '@tngraphql/illuminate';
import { UserRepository } from '../../../Repositories/Lucid/UserRepository';
import { BaseResolve } from './BaseResolve';
import { SelectionCriteria } from '../../../Repositories/Criteria/SelectionCriteria';
import { SelectFields } from '../../../decorators/SelectFields';

@Resolver()
export class AuthResolve extends BaseResolve {
    @Inject(UserRepository)
    public repo: UserRepository;

    @Mutation(returns => UserType, { description: 'Đăng nhập hệ thống.' })
    @ValidateArgs({
        email: [
            'required',
            'email'
        ],
        password: [
            'required',
            'string'
        ]
    })
    async authMutation(
        @Arg('email', returns => GraphQLString, { description: 'Email đăng nhập' }) email: string,
        @Arg('password', returns => GraphQLString, { description: 'Mật khẩu đăng nhập' }) password: string,
        @SelectFields() fields
    ) {
        const user = await this.repo.comparePassword({ email, password });

        if ( ! user ) {
            throw new Error(this.lang.t('These credentials do not match our records.'));
        }

        const token = await user.createToken('new', ['viewUser']);

        const instance = await this.repo.query()
                                   .pushCriteria(new SelectionCriteria(fields))
                                   .firstBy(user.id);

        instance['token'] = token;

        return instance;
    }

    @Mutation(returns => UserType, { description: 'Đăng nhập hệ thống qua facebook.' })
    @ValidateArgs({
        code: [
            'required',
        ]
    })
    async authFacebook(
        @Arg('code', returns => GraphQLString, { description: 'Mã code' }) code: string
    ) {

    }

    @Mutation(returns => UserType, { description: 'Đăng nhập hệ thống qua google.' })
    @ValidateArgs({
        token: [
            'required',
        ]
    })
    async authGoogle(
        @Arg('token', returns => GraphQLString, { description: 'Mã token' }) token: string
    ) {

    }
}
