/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:40 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasMany, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import {Sluggable} from "@tngraphql/slugify";
import {LanguageMixin} from "../../../../lib/LanguageMixin";
import {ProductCategoryModel} from "./ProductCategoryModel";
import {HasMany, HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {ProductTypeMetaModel} from "./ProductTypeMetaModel";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";
import {Str} from "../../../../lib/Str";

export class ProductTypeModel extends BaseModel {
    public static table = 'product_types';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

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

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes, Sluggable, LanguageMixin])
    }

    public sluggable() {
        return  {
            source: ['name'],
            slugOptions: { lower: true },
            overwrite: false,
            column: 'slug'
        }
    }

    @hasMany(() => ProductTypeMetaModel)
    public meta: HasMany<typeof ProductTypeMetaModel>

    @hasOne(() => ProductCategoryModel, {
        foreignKey: 'categoryId',
        onQuery(query) {
            query.groupBy('categoryId').selectRaw('COUNT(id) as total');
        }
    })
    public productCount: HasOne<typeof ProductCategoryModel>
}