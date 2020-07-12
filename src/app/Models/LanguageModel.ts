import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class LanguageModel extends BaseModel {
    static table = 'languages'

    @column({ isPrimary: true, consume: value => String(value) })
    public id: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<LanguageModel, 'id' | 'createdAt' | 'updatedAt'>
}
