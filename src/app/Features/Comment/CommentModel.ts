import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column, hasOne, manyToMany, morphOne, morphTo} from "@tngraphql/lucid/build/src/Orm/Decorators";
import {DateTime} from "luxon";
import {SoftDeletes} from "@tngraphql/lucid/build/src/Orm/SoftDeletes";
import {UserModel} from "../../UserModel";
import {BelongsTo, HasOne, MorphOne, MorphTo} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";
import {PostModel} from "../Post/PostModel";
import {Relation} from "@tngraphql/lucid/build/src/Orm/Relations/Base/Relation";
import {Str} from "../../../lib/Str";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/19/2020
 * Time: 9:07 PM
 */

export default class CommentModel extends BaseModel {
    public static table = 'comments';

    @column({isPrimary: true, consume: value => Str.toString(value)})
    public id: string

    @column()
    public authorName: string;

    @column()
    public authorEmail: string;

    @column()
    public authorUrl: string;

    @column()
    public authorIp: string;

    @column({consume: value => Str.toString(value)})
    public authorId: string;

    @column({consume: value => Str.toString(value)})
    public parentId: string;

    @column()
    public body: string;

    @column()
    public status: string;

    @column()
    public commentableType: string;

    @column({consume: value => Str.toString(value)})
    public commentableId: string;

    @column.dateTime()
    public publishedAt: DateTime

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime

    static boot() {
        this.uses([SoftDeletes]);
    }

    @hasOne(() => UserModel, {
        localKey: 'authorId',
        foreignKey: 'id'
    })
    public author: HasOne<typeof UserModel>

    @morphTo({
        type: 'commentableType',
        id: 'commentableId',
        onQuery(query) {
            query.select('*')
        }
    })
    public responseTo: MorphTo<any>

    @morphOne(() => PostModel, {name: 'commentable'})
    public post: MorphOne<typeof PostModel>;

    @hasOne(() => CommentModel, {
        localKey: 'id',
        foreignKey: 'parentId',
        onQuery(query) {
            // @ts-ignore
            query.groupBy('parentId').select(Database.raw('COUNT(id) as total'));
        }
    })
    public totalReply: HasOne<typeof CommentModel>;
}