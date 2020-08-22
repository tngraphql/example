/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 9:28 PM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {column, hasMany, hasOne} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import {LanguageMixin} from "../../../lib/LanguageMixin";
import {Str} from "../../../lib/Str";
import {converBoolean} from "../../../lib/utils";
import {Sluggable} from "@tngraphql/slugify";
import {Slugify} from "@tngraphql/slugify/dist/lib/Sluglife";
import {MenuItemModel} from "./MenuItemModel";
import {HasMany, HasOne} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";

export class MenuModel extends BaseModel {
    static table = 'menus';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public name: string;

    @column()
    public alias: string;

    @column()
    public slug: string;

    @column()
    public status: string;

    @column()
    public description: string;

    @column({consume: value => Str.toString(value)})
    public language: string;

    @column({consume: value => Str.toString(value)})
    public languageMaster: string;

    @column({
        prepare: value => converBoolean(value, '1', '0'),
        consume: value => Number(value) === 1
    })
    public automanticallyMenu: boolean;

    public static scopeAutomanticallyMenu(query, boolean = true, operation = '=') {
        if (typeof boolean !== "boolean") {
            throw new Error('value for isFeatured be must boolean');
        }
        return query.where('automanticallyMenu', operation, converBoolean(boolean, 1, 0));
    }

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime;

    public static boot() {
        this.uses([SoftDeletes, LanguageMixin, Sluggable]);

        this.addGlobalScope('defaultSelect', query => {
            if (!query.hasAggregates && query.knexQuery['_statements'].some(x => x.grouping === 'columns')) {
                query.select('language', 'languageMaster')
            }
        });

        Slugify.slugifyModel(this, {
            source: ['name'],
            slugOptions: { lower: true },
            overwrite: false,
            column: 'alias'
        });
    }

    public sluggable() {
        return {
            source: ['name'],
            slugOptions: { lower: true },
            overwrite: false,
            column: 'slug'
        };
    }

    @hasMany(() => MenuItemModel, {
        onQuery(query) {
            query.orderBy('sort', 'asc');
        }
    })
    public menuItems: HasMany<typeof MenuItemModel>

    @hasOne(() => MenuItemModel)
    public menuItem: HasOne<typeof MenuItemModel>
}