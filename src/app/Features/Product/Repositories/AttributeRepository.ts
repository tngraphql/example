/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 3:58 PM
 */

import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {AttributeModel} from "../Models/AttributeModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";

@Service()
export class AttributeRepository extends BaseRepository<AttributeModel> {
    public model(): typeof AttributeModel {
        return AttributeModel;
    }

    public async firstOrCreate(search: Partial<ModelAttributes<AttributeModel>>, data: Partial<ModelAttributes<AttributeModel>>) {
        return this.model().firstOrCreate(search, data);
    }
}