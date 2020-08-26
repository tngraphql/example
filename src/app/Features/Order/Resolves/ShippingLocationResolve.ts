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
import {ShippingLocationRepository} from "../Repositories/ShippingLocationRepository";
import {ConfigOptions} from "../../../../lib/ConfigOptions";
import {OperatorEnumType} from "../../../GraphQL/Types/OperatorEnumType";
import {ShippingLocationType} from "../Types/ShippingLocation/ShippingLocationType";
import {ShippingLocationIndexArgsType} from "../Types/ShippingLocation/ShippingLocationIndexArgsType";
import {ShippingLocationListArgsType} from "../Types/ShippingLocation/ShippingLocationListArgsType";

@Resolver()
export class ShippingLocationResolve extends BaseResolve {
    @Inject(ShippingLocationRepository)
    public repo: ShippingLocationRepository;

    @Query(returns => ShippingLocationType, {description: 'Chi tiết menu.'})
    async index(@Args() args: ShippingLocationIndexArgsType, @SelectFields() fields) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.first();
    }

    @Query(returns => paginateType(ShippingLocationType), {description: 'Danh sách menu.'})
    async list(@Args() args: ShippingLocationListArgsType, @SelectFields() fields, @Ctx() context) {
        // console.log(context.auth);
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));

        return this.repo.paginate(args.limit, args.page);
    }
}
