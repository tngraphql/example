import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { Str } from '../../../lib/Str';

export default class CommentmetaModel extends BaseModel {
    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: number

    @column({ consume: value => Str.toString(value) })
    public commentId: string

    @column()
    public metaKey: string

    @column()
    public metaValue: string

    public static $columns: Pick<CommentmetaModel, 'id' | 'commentId' | 'metaKey' | 'metaValue'>
}
