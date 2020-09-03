import { DateTime } from 'luxon'
import { column, hasOne } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { UserModel } from '../UserModel';
import { HasOne } from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';

export default class UserSocialModel extends BaseModel {
    static table = 'user_socials';

    @column({ isPrimary: true })
    public id: number

    @column()
    public provider: string

    @column()
    public providerId: number

    @column()
    public userId: number

    @column()
    public url: string

    @hasOne(() => UserModel)
    public user: HasOne<typeof UserModel>;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<UserSocialModel, 'id' | 'provider' | 'providerId' | 'userId' | 'url' | 'createdAt' | 'updatedAt'>
}
