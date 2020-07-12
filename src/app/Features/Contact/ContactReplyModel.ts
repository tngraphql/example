import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';

export default class ContactReplyModel extends BaseModel {
    public static table = 'contact_replies';

    @column({ isPrimary: true, consume: value => String(value) })
    public id: string

    @column()
    public message: string

    @column({consume: value => String(value)})
    public contactId: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<ContactReplyModel, 'id' | 'message' | 'contactId' | 'createdAt' | 'updatedAt'>
}
