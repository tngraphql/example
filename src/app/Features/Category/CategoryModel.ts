/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 4:41 PM
 */
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { column, hasMany } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { DateTime } from 'luxon';
import { LanguageMixin } from '../../../lib/LanguageMixin';
import CategorymetaModel from './CategorymetaModel';
import { HasMany } from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';
import { SoftDeletes } from '@tngraphql/lucid/build/src/Orm/SoftDeletes';
import { Sluggable } from '@tngraphql/slugify';
import { Str } from '../../../lib/Str';

export default class CategoryModel extends BaseModel {
    public static table = 'categories';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public name: string;

    @column()
    public description: string;

    @column({ consume: value => Str.toString(value) })
    public parentId: string;

    @column()
    public slug: string;

    @column()
    public categoryOrder: number;

    @column({ consume: value => Str.toString(value) })
    public language: string;

    @column({ consume: value => Str.toString(value) })
    public languageMaster: string;

    @column()
    public seoTitle: string;

    @column()
    public seoDescription: string;

    @column()
    public seoKeyword: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime

    @hasMany(() => CategorymetaModel, {
        localKey: 'languageMaster',
        foreignKey: 'categoryId'
    })
    public meta: HasMany<typeof CategorymetaModel>

    public static $columns: Pick<CategoryModel, 'id' | 'name' | 'description' | 'parentId' | 'slug'
        | 'categoryOrder' | 'language' | 'languageMaster' | 'seoTitle' | 'seoDescription' | 'seoKeyword'
        | 'createdAt' | 'updatedAt' | 'deletedAt'>

    static boot() {
        super.boot();

        this.uses([SoftDeletes, LanguageMixin, Sluggable]);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public sluggable() {
        return {
            source: ['name'],
            slugOptions: { lower: true },
            overwrite: false,
            column: 'slug'
        }
    }
}