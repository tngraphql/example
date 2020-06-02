/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/28/2020
 * Time: 4:52 PM
 */
import {Criteria} from "./Criteria";
import {ModelQueryBuilderContract} from "@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {BaseRepository} from "../Lucid/BaseRepository";

export class SortByCriteria extends Criteria {
    constructor(protected sortBy: any) {
        super();
    }

    public apply(query: ModelQueryBuilderContract<LucidModel>, repository: BaseRepository) {
        for (let field in this.sortBy) {
            repository.orderBy(field, this.sortBy[field]);
        }
    }
}