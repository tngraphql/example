import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import {Str} from "../../../lib/Str";

export default class ContactModel extends BaseModel {
    public static table = 'contacts';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public name: string;

    @column()
    public email: string;

    @column()
    public phone: string;

    @column()
    public address: string;

    @column()
    public content: string;

    @column()
    public subject: string;

    @column()
    public status: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<ContactModel, 'id' | 'name' | 'email' | 'phone' | 'address' | 'content' | 'subject' | 'status' | 'createdAt' | 'updatedAt'>
}
