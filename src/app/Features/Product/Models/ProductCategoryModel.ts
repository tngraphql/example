/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:31 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";

export class ProductCategoryModel extends BaseModel {
    public static table = 'product_category';

    @column({ consume: value => String(value) })
    public productMasterId: string;

    @column({ consume: value => String(value) })
    public categoryId: string;
}