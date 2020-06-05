import {Args, Ctx, Info, Mutation, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
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
import {UserModel} from "../../UserModel";
Gate.define('admin', (user, resource) => {
    console.log({resource});
    return true;
})

@Resolver()
export class UserResolve extends BaseResolve {

    @Inject(UserRepository)
    public repo: UserRepository;

    constructor(@ResolveData() data) {
        super();
    }

    @Query(returns => UserType)
    @UseMiddleware('auth')
    async profile(@Ctx() context: any) {
        this.repo.pushCriteria(new FilterCriteria({
            field: 'id',
            operator: OperatorEnumType.eq,
            value: await context.auth.id()
        }))
        return this.repo.first();
    }

    @Query(returns => paginateType(UserType))
    @UseMiddleware(['auth'])
    async list(@Args() args: UserListArgsType, @SelectFields() fields, @Ctx() context) {
        // UserModel.create({name: '123'})
        return super.list(args, fields, context);
    }

    @Mutation(returns => UserType, {description: 'Tạo mới tài khoản'})
    create(@Args() args: UserCreateArgsType) {
        return this.repo.create(args);
    }

    @Mutation(returns => UserType)
    update() {

    }

    @Mutation(returns => DeleteType)
    delete() {

    }
}
