import {Args, Ctx, Info, Mutation, Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import {UserRepository} from "../../../Repositories/Lucid/UserRepository";
import {UserType} from "../Types/User/UserType";
import {BaseResolve} from "./BaseResolve";
import {SelectFields} from "../../../decorators/SelectFields";
import {UserListArgsType} from "../Types/User/UserListArgsType";
import {Inject, ResolveData, ValidateArgs} from "@tngraphql/illuminate";
import {DeleteType} from "../Types/DeleteType";
import {paginateType} from "../Types/PaginateType";
import {Gate} from "@tngraphql/guard/dist/src";
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

    @Query(returns => paginateType(UserType))
    @UseMiddleware(['can:admin,12'])
    @ValidateArgs({page: ['required']})
    async list(@Args() args: UserListArgsType, @SelectFields() fields, @Ctx() context) {
        context.guard.allows('admin', {a: 1});
        return super.list(args, fields, context);
    }

    @Mutation(returns => UserType)
    create() {
        return {};
    }

    @Mutation(returns => UserType)
    update() {

    }

    @Mutation(returns => DeleteType)
    delete() {

    }
}
