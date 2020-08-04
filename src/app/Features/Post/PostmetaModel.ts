import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column} from "@tngraphql/lucid/build/src/Orm/Decorators";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 1:47 PM
 */

export default class PostmetaModel extends BaseModel {
    public static table = 'postmeta';

    @column({ isPrimary: true, consume: value => String(value) })
    public id: string

    @column({ consume: value => String(value) })
    public postId: string;

    @column()
    public metaKey: string;

    @column()
    public metaValue: string;

    public static $columns: Pick<PostmetaModel, 'id' | 'postId' | 'metaKey' | 'metaValue'>
}