/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 10:53 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasMany, hasOne, manyToMany} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import CategoryModel from "../Category/CategoryModel";
import {HasMany, ManyToMany} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import TagModel from "../Tag/TagModel";
import {UserModel} from "../../UserModel";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";
import PostmetaModel from "./PostmetaModel";
import {LanguageMixin} from "../../../lib/LanguageMixin";
import {converBoolean} from "../../../lib/utils";
import {Str} from "../../../lib/Str";


class PostModel extends BaseModel {
    public static table = 'posts';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string;

    @column()
    public format: number;

    @column({
        prepare: value => converBoolean(value),
        consume: value => Number(value) === 1
    })
    public isFeatured: boolean;

    @column()
    public views: number;

    @column()
    public name: string;

    @column({consume: value => Str.toString(value)})
    public authorId: string;

    @column({consume: value => Str.toString(value)})
    public parentId: string;

    @column()
    public postStatus: string;

    @column()
    public commentStatus: string;

    @column()
    public commentCount: number;

    @column()
    public postPassword: string;

    @column()
    public avatar: string;

    @column()
    public description: string;

    @column()
    public content: string;

    @column()
    public type: string;

    @column()
    public seoTitle: string;

    @column()
    public seoDescription: string;

    @column()
    public seoKeyword: string;

    @column({consume: value => Str.toString(value)})
    public language: string;

    @column({consume: value => Str.toString(value)})
    public languageMaster: string;

    @column.dateTime()
    public publishedAt: DateTime;

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime;

    @column.dateTime()
    public deletedAt: DateTime;

    @manyToMany(() => CategoryModel, {
        pivotForeignKey: 'post_id',
        pivotRelatedForeignKey: 'category_id',
        pivotTable: 'post_category'
    })
    public categories: ManyToMany<typeof CategoryModel>

    @manyToMany(() => TagModel, {
        pivotForeignKey: 'post_id',
        pivotRelatedForeignKey: 'tag_id',
        pivotTable: 'post_tag'
    })
    public tags: ManyToMany<typeof CategoryModel>;


    @hasOne(() => PostModel, {
        localKey: 'id',
        foreignKey: 'parentId',
        onQuery(query) {
            // @ts-ignore
            query.groupBy('parentId').select(Database.raw('COUNT(id) as total'));
        }
    })
    public subCount: any;

    @hasOne(() => UserModel, {
        localKey: 'authorId',
        foreignKey: 'id'
    })
    public author;

    @hasMany(() => PostmetaModel, {
        localKey: 'id',
        foreignKey: 'postId'
    })
    public meta: HasMany<typeof PostmetaModel>

    @column({consume: value => Str.toString(value)})
    public thumbnailId: string;

    public thumbnail;

    public static $columns: Pick<PostModel, 'id' | 'format' | 'isFeatured' | 'views' | 'name' | 'authorId'
        | 'parentId' | 'postStatus' | 'commentStatus' | 'commentCount' | 'postPassword' | 'avatar'
        | 'thumbnailId' | 'description' | 'content' | 'type' | 'seoTitle' | 'seoDescription'
        | 'seoKeyword' | 'language' | 'languageMaster' | 'publishedAt' | 'createdAt' | 'updatedAt' | 'deletedAt'>

    public static boot() {
        super.boot();
        this.uses([SoftDeletes, LanguageMixin]);

        this.addGlobalScope(builder => {
            builder.where('type', 'post');
        });

        this.before('create', model => {
            model.$setAttribute('type', 'post');
            model.$setAttribute('commentCount', '0');
            model.$setAttribute('views', 0);
            if (!model.format) {
                model.$setAttribute('format', 1);
            }
            if (!model.isFeatured) {
                model.$setAttribute('isFeatured', 0);
            }
            if (!model.parentId) {
                model.$setAttribute('parentId', '0');
            }
        })
    }
}

export {PostModel};