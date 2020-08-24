/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
import {Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware} from "@tngraphql/graphql";
import {BaseResolve} from "../../../GraphQL/Resolves/BaseResolve";
import {Inject, ValidateArgs} from "@tngraphql/illuminate";
import {SelectFields} from "../../../../decorators/SelectFields";
import {SortByCriteria} from "../../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../../Repositories/Criteria/SelectionCriteria";
import {paginateType} from "../../../GraphQL/Types/PaginateType";
import {DeleteType} from "../../../GraphQL/Types/DeleteType";
import {Resource} from "../../../../lib/Resource";
import {MenuRepository} from "../Repositories/MenuRepository";
import {MenuListArgsType} from "../Types/MenuListArgsType";
import {MenuType} from "../Types/MenuType";
import {MenuIndexArgsType} from "../Types/MenuIndexArgsType";
import {MenuCreateArgsType} from "../Types/MenuCreateArgsType";
import {MenuUpdateArgsType} from "../Types/MenuUpdateArgsType";
import {MenuDeleteArgsType} from "../Types/MenuDeleteArgsType";
import {MenuNavigationEnumType} from "../Types/Enum/MenuNavigationEnumType";
import {ConfigOptions} from "../../../../lib/ConfigOptions";
import {OperatorEnumType} from "../../../GraphQL/Types/OperatorEnumType";

@Resolver()
export class MenuResolve extends BaseResolve {
    @Inject(MenuRepository)
    public repo: MenuRepository;

    @Query(returns => MenuType, {description: 'Chi tiết menu.'})
    async index(@Args() args: MenuIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => MenuType, {description: 'menu Navigation'})
    async menuNavigation(
        @Arg('navigation', returns => MenuNavigationEnumType) navigation: string = 'mainNavigation',
        @SelectFields() fields
    ) {
        navigation = await ConfigOptions.getOption(navigation);
        const defaultLanguage = await ConfigOptions.getOption('defaultLanguage');
        console.log({navigation, defaultLanguage}, this.lang.id)

        const query = this.repo.query();

        query.pushCriteria(new FilterCriteria({
            operator: OperatorEnumType.eq,
            field: 'id',
            value: navigation[this.lang.id || defaultLanguage]
        }));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.first();
    }

    @Query(returns => paginateType(MenuType), {description: 'Danh sách menu.'})
    async list(@Args() args: MenuListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }

    @Mutation(returns => MenuType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(MenuCreateArgsType)
    @UseMiddleware(['auth'])
    async create(@Args() args: MenuCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.create(args);
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.firstBy(created.id);
    }

    @Mutation(returns => MenuType)
    @ValidateArgs(MenuUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: MenuUpdateArgsType, @SelectFields() fields) {
        const instance = await this.repo.update(args, args.id);

        return this.repo
            .query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(instance.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(MenuDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: MenuDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }
}
