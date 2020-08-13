import { DateTime } from 'luxon'
import { column } from '@tngraphql/lucid/build/src/Orm/Decorators';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import {Str} from "../../lib/Str";

export default class MediaModel extends BaseModel {
    static table = 'media';

    @column({ isPrimary: true, consume: value => Str.toString(value) })
    public id: string

    @column()
    public status: string;

    @column()
    public title: string;

    @column()
    public folderName: string;

    @column()
    public guid: string;

    @column()
    public src: string;

    @column()
    public srcMd5: string;

    @column()
    public rootId: string;

    @column()
    public filesize: string;

    @column()
    public mineType: string;

    @column()
    public data: string;

    @column({columnName: 'data'})
    public thumbnail: string;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    public static $columns: Pick<MediaModel, 'id' | 'status' | 'title' | 'folderName' | 'guid' | 'src' | 'srcMd5' | 'rootId' | 'filesize' | 'mineType' | 'data' | 'createdAt' | 'updatedAt'>
}
