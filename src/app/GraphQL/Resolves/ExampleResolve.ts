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
import { UserModel } from '../../UserModel';
import { Rules } from '@tngraphql/illuminate/dist/Decorators/Rules';
import { ValidateArgs } from '@tngraphql/illuminate/dist/Decorators/ValidateArgs';
import { Inject } from '@tngraphql/illuminate';
import { GraphQLString } from 'graphql';
import { Mailable } from '@tngraphql/mail';
import { Mail } from '@tngraphql/mail/dist/src/Mail';
import { TestEmail } from '../../Mail/TestEmail';
import { UserType } from '../Types/User/UserType';

@InputType()
class UserInput {
    @Field()
    @Rules('in:123')
    name: string
}


@ArgsType()
class InputArgs {
    @Field()
    @Rules('string')
    name: string;

    @Field(type => [UserInput])
    @Rules([UserInput])
    user: UserInput[]
}

var a = 0;

@Resolver(of => UserType)
export class ExampleResolve {

    @Query(returns => [UserType])
    // @UseMiddleware('auth')
    @UseMiddleware('acl:viewUser')
    @ValidateArgs(InputArgs)
    async index(@Args(returns => InputArgs) args: InputArgs, @Ctx() { auth, guard }) {
        // await guard.allows('viewUser');
        return UserModel.all();
    }


    @Mutation(returns => GraphQLString)
    async login(@Ctx() { name, req, res }) {
        // console.log(res.headers)
        return (await UserModel.find(1)).createToken('new', ['viewUser']);
    }

    @Query()
    sfasf2(): string {
        return '2';
    }

    @Query(returns => GraphQLString)
    async sentmail(): Promise<string> {
        const nodemailer = require('nodemailer');
        const mailable = new TestEmail();

        // Mail.fake();
        const info = await Mail.to('mail@gmail.com').send(mailable);
        // console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
        return nodemailer.getTestMessageUrl(info);
    }


    // @FieldResolver()
    // async name(@Root() root, @Ctx() {name}) {
    //     console.log({name})
    //     // await Database.from('name')
    //     return root.name;//.toUpperCase() + 'nguyen';
    // }
}
