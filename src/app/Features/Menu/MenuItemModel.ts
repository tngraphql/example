/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 9:28 PM
 */

import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasOne, morphTo} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {Str} from "../../../lib/Str";
import CategoryModel from "../Category/CategoryModel";
import {PostModel} from "../Post/Models/PostModel";
import {ProductMasterModel} from "../Product/Models/ProductMasterModel";
import TagModel from "../Tag/TagModel";
import {ProductTypeModel} from "../Product/Models/ProductTypeModel";
import {MenuModel} from "./MenuModel";
import {BelongsTo, MorphTo} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";

export class MenuItemModel extends BaseModel {
    static table = 'menu_items';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column({consume: value => Str.toString(value)})
    public menuId: string;

    @column()
    public title: string;

    @column()
    public link: string;

    @column()
    public icon: string;

    @column()
    public className: string;

    @column()
    public target: string;

    @column()
    public objectType: string;

    @column({consume: value => Str.toString(value)})
    public objectId: string;

    @column({consume: value => Str.toString(value)})
    public parentId: string;

    @column()
    public sort: number;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static boot() {
        this.morphMap({
            category: () => CategoryModel,
            post: () => PostModel,
            productMaster: () => ProductMasterModel,
            productType: () => ProductTypeModel,
            tag: () => TagModel
        });

        this.addGlobalScope('defaultSelect', query => {
            if (!query.hasAggregates && query.knexQuery['_statements'].some(x => x.grouping === 'columns')) {
                query.select('objectType', 'objectId')
            }
        });
    }

    @belongsTo(() => MenuModel)
    public menu: BelongsTo<typeof MenuModel>;

    @morphTo({
        type: 'objectType',
        id: 'objectId',
        onQuery(query) {
            query.select('*');
        }
    })
    public objectItem: MorphTo<typeof CategoryModel | typeof PostModel | typeof ProductMasterModel | typeof ProductTypeModel
        | typeof TagModel>;

    @belongsTo(() => PostModel, {
        foreignKey: 'objectId'
    })
    public post: BelongsTo<typeof PostModel>;

    @belongsTo(() => CategoryModel, {foreignKey: 'objectId'})
    public category: BelongsTo<typeof CategoryModel>;

    @belongsTo(() => ProductTypeModel, {foreignKey: 'objectId'})
    public productType: BelongsTo<typeof ProductTypeModel>;

    @belongsTo(() => TagModel, {foreignKey: 'objectId'})
    public tag: BelongsTo<typeof TagModel>;
}