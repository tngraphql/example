import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { Str } from '../../../lib/Str';

export class LanguageModel extends BaseModel {
    static table = 'languages'

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public name: string;

    @column()
    public locale: string;

    @column()
    public code: string;

    @column()
    public direction: number;

    @column()
    public flag: string;

    @column()
    public position: number;

    @column({
        defaultValue: 'publish'
    })
    public status: string; // enum 'publish', 'draft'

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<LanguageModel, 'id' | 'name' | 'locale' | 'code' | 'direction'
        | 'flag' | 'position' | 'status' | 'createdAt' | 'updatedAt'>
}
