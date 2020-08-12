/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 4:01 PM
 */

import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductVendorModel} from "../Models/ProductVendorModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";

@Service()
export class ProductVendorRepository extends BaseRepository<ProductVendorModel> {
    public model(): LucidModel {
        return ProductVendorModel;
    }

}