import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { Str } from '../../../lib/Str';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 1:47 PM
 */

export default class PostmetaModel extends BaseModel {
    public static table = 'postmeta';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column({ consume: value => Str.toString(value) })
    public postId: string;

    @column()
    public metaKey: string;

    @column()
    public metaValue: string;

    public static $columns: Pick<PostmetaModel, 'id' | 'postId' | 'metaKey' | 'metaValue'>
}