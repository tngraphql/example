import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import {Str} from "../../lib/Str";

export default class PasswordResetModel extends BaseModel {
    static table = 'password_resets';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public email: string;

    @column()
    public token: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    public static $columns: Pick<PasswordResetModel, 'email' | 'token' | 'createdAt'>
}
