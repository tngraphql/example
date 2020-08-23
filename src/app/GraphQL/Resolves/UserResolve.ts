import {Arg, Args, Ctx, Info, Mutation, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import {UserRepository} from "../../../Repositories/Lucid/UserRepository";
import {UserType} from "../Types/User/UserType";
import {BaseResolve} from "./BaseResolve";
import {SelectFields} from "../../../decorators/SelectFields";
import {UserListArgsType} from "../Types/User/UserListArgsType";
import {args, Inject, ResolveData, ValidateArgs} from "@tngraphql/illuminate";
import {DeleteType} from "../Types/DeleteType";
import {paginateType} from "../Types/PaginateType";
import {Gate} from "@tngraphql/guard/dist/src";
import {UserCreateArgsType} from "../Types/User/UserCreateArgsType";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {OperatorEnumType} from "../Types/OperatorEnumType";
import {Filter} from "../Middleware/Filter";
import {UserIndexArgsType} from "../Types/User/UserIndexArgsType";
import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {UserRegisterArgsType} from "../Types/User/UserRegisterArgsType";
import {MessageType} from "../Types/MessageType";
import {GraphQLString} from "graphql";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {UserModel} from "../../UserModel";
import {PasswordResetRepository} from "../../../Repositories/Lucid/PasswordResetRepository";
import {UserResetPasswordArgsType} from "../Types/User/UserResetPasswordArgsType";
import {UserProfileArgsType} from "../Types/User/UserProfileArgsType";
import {UserUpdateArgsType} from "../Types/User/UserUpdateArgsType";
import {UserChangePasswordArgsType} from "../Types/User/UserChangePasswordArgsType";
Gate.define('admin', (user, resource) => {
    console.log({resource});
    return true;
})

@Resolver()
export class UserResolve extends BaseResolve {

    @Inject(UserRepository)
    public repo: UserRepository;

    @Inject(PasswordResetRepository)
    public password: PasswordResetRepository

    constructor(@ResolveData() data) {
        super();
    }

    @Query(returns => UserType)
    @UseMiddleware(Filter)
    async index(@Args() args: UserIndexArgsType, @SelectFields() fields){
        const query = this.repo.query();
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));
        return query.first();
    }

    @Query(returns => paginateType(UserType))
    @UseMiddleware(['auth'])
    async list(@Args() args: UserListArgsType, @SelectFields() fields, @Ctx() context) {
        const query = this.repo.query();
        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));
        return query.paginate(args.limit, args.page);
    }

    @Query(returns => UserType)
    @UseMiddleware('auth')
    async profile(@Ctx() context: any, @SelectFields() fields) {
        return this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(await this.auth.id());
    }

    @Mutation(returns => UserType, {description: 'Tạo mới tài khoản'})
    @UseMiddleware('auth')
    async create(@Args() args: UserCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);

        return this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(created.id);
    }

    @Mutation(returns => UserType, {description: 'Cập nhật người dùng'})
    @UseMiddleware('auth')
    async update(@Args() args: UserUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);

        return this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @UseMiddleware('auth')
    async delete() {

    }

    @Mutation(returns => UserType, {description: 'Cập nhật thông tin cá nhân'})
    @ValidateArgs(UserProfileArgsType)
    @UseMiddleware('auth')
    async profileUpdate(@Args() args: UserProfileArgsType, @SelectFields() fields) {
        await this.repo.update(args, await this.auth.id());

        return this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(await this.auth.id());
    }

    @Mutation(returns => UserType, {description: 'Đăng ký tài khoản'})
    @ValidateArgs(UserRegisterArgsType)
    async register(@Args() args: UserRegisterArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => MessageType, {description: 'Quyên mật khẩu'})
    @ValidateArgs({
        email: [
            'required',
            'email',
            Rule.exists(UserModel.getTable(), 'email')
        ]
    }, ({lang}) => ({
        // 'Chúng tôi không thể tìm thấy người dùng có địa chỉ email đó.'
        'email': lang.t('We can\'t find a user with that e-mail address.')
    }))
    async forgotPassword(
        @Arg('email', returns => GraphQLString, {description: 'E-Mail Address'}) email: string
    ) {

        await this.password.forgot({email});

        return {
            status: 2,
            message: this.lang.t('We have e-mailed your password reset link!')
        }
    }

    @Mutation(returns => MessageType, {description: 'Đặt lại mật khẩu'})
    @ValidateArgs(UserResetPasswordArgsType)
    async resetPassword(@Args() args: UserResetPasswordArgsType) {
        await this.repo.resetPassword(args);

        return {
            status: 2,
            message: this.lang.t('Your password has been reset!')// 'Mật khẩu của bạn đã được thiết lập lại!'
        };
    }

    @Mutation(returns => UserType, {description: 'Đổi mật khẩu người dùng'})
    @ValidateArgs(UserChangePasswordArgsType)
    @UseMiddleware('auth')
    async userChangePassword(@Args() args: UserChangePasswordArgsType) {
        const user = await this.auth.user();

        if ( ! await this.repo.comparePassword({ email: user.email, password: args.oldPassword }) ) {
            throw new Error(this.lang.t('The new password must not match the old password.'));
        }

        const updated = await this.repo.changePassword(args.password, user.id);
    }
}
