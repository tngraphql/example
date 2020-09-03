import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { Sluggable } from '@tngraphql/slugify';
import { Str } from '../../../lib/Str';

export default class TagModel extends BaseModel {
    public static table = 'tags';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    name: string;

    @column()
    slug: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<TagModel, 'id' | 'name' | 'slug' | 'createdAt' | 'updatedAt'>;

    public static boot() {
        super.boot();

        this.use(Sluggable);
    }

    public sluggable() {
        return {
            source: ['name'],
            slugOptions: { lower: true },
            overwrite: false,
            column: 'slug'
        };
    }
}
