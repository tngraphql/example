import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 4:42 PM
 */

export default class CategorymetaModel extends BaseModel {
    public static table = 'categorymeta';

    @column({ isPrimary: true, consume: value => String(value) })
    public id: string

    @column({ consume: value => String(value) })
    public categoryId: string;

    @column()
    public metaKey: string;

    @column()
    public metaValue: string;

    public static $columns: Pick<CategorymetaModel, 'id' | 'categoryId' | 'metaKey' | 'metaValue'>
}