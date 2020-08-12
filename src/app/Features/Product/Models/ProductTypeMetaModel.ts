/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:39 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";

export class ProductTypeMetaModel extends BaseModel {
    public static table = 'product_type_meta';
    @column({isPrimary: true, consume: value => String(value)})
    public id: string;

    @column({consume: value => String(value)})
    public productTypeId: string;

    @column()
    public metaKey: string;

    @column()
    public metaValue: string;
}