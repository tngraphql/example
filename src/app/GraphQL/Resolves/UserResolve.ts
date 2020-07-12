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
import {Filter} from "../Middleware/Filter";
import {UserIndexArgsType} from "../Types/User/UserIndexArgsType";
import {IPaginateType} from "../../../Contracts/IPaginateType";
import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
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
    @UseMiddleware(Filter)
    async index(@Args() args: UserIndexArgsType, @SelectFields() fields){
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().first();
    }

    @Query(returns => paginateType(UserType))
    @UseMiddleware(['auth'])
    async list(@Args() args: UserListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().paginate(args.limit, args.page);
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

    async profileUpdate() {

    }

    async register() {

    }

    async forgotPassword() {

    }

    async resetPassword() {

    }
}
