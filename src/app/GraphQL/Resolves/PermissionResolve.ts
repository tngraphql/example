/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:14 PM
 */
import {Args, Ctx, Query, Resolver} from "@tngraphql/graphql";
import {BaseResolve} from "./BaseResolve";
import {Inject} from "@tngraphql/illuminate";
import {SelectFields} from "../../../decorators/SelectFields";
import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {RoleListArgsType} from "../Types/Role/RoleListArgsType";
import {PermissionRepository} from "../../../Repositories/Lucid/PermissionRepository";
import {PermissionType} from "../Types/Permission/PermissionType";

@Resolver()
export class PermissionResolve extends BaseResolve {
    @Inject(PermissionRepository)
    public repo: PermissionRepository;

    @Query(returns => [PermissionType])
    async list(@Args() args: RoleListArgsType, @SelectFields() fields, @Ctx() context) {
        this.repo.pushCriteria(new SortByCriteria(args.order));
        this.repo.pushCriteria(new FilterCriteria(args.filter));
        this.repo.pushCriteria(new SelectionCriteria(fields));
        return this.repo.query().all();
    }
}