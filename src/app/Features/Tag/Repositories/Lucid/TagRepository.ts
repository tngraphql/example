/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "../../../../../Repositories/Lucid/BaseRepository";
import {Service} from "@tngraphql/illuminate";
import TagModel from "../../TagModel";

@Service()
export class TagRepository extends BaseRepository<TagModel> {
    public model(): typeof TagModel {
        return TagModel;
    }
}
