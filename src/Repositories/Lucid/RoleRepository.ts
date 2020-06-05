/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "./BaseRepository";
import {Service} from "@tngraphql/illuminate";
import RoleModel from "../../app/Models/RoleModel";

@Service()
export class RoleRepository extends BaseRepository<RoleModel> {
    public model(): typeof RoleModel {
        return RoleModel;
    }
}
