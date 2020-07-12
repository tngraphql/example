import {SortByCriteria} from "../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../Repositories/Criteria/SelectionCriteria";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {Args, Ctx, Query, Resolver, UseMiddleware} from "@tngraphql/graphql";
import {UserType} from "../Types/User/UserType";
import {Filter} from "../Middleware/Filter";
import {UserIndexArgsType} from "../Types/User/UserIndexArgsType";
import {SelectFields} from "../../../decorators/SelectFields";
import {paginateType} from "../Types/PaginateType";
import {UserListArgsType} from "../Types/User/UserListArgsType";
import {IPaginateType} from "../../../Contracts/IPaginateType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:59 PM
 */

@Resolver()
export class BaseResolve {
    public repo: BaseRepository;
}