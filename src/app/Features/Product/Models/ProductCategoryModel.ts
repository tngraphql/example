/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:31 AM
 */
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { Str } from '../../../../lib/Str';

export class ProductCategoryModel extends BaseModel {
    public static table = 'product_category';

    @column({ consume: value => Str.toString(value) })
    public productMasterId: string;

    @column({ consume: value => Str.toString(value) })
    public categoryId: string;
}