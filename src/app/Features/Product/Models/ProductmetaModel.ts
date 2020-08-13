/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 9:35 AM
 */
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {belongsTo, column} from "@tngraphql/lucid/build/src/Orm/Decorators";
import MediaModel from "../../../Models/MediaModel";
import {BelongsTo} from "@tngraphql/lucid/build/src/Contracts/Orm/Relations/types";
import {Str} from "../../../../lib/Str";

export class ProductmetaModel extends BaseModel {
    public static table = 'productmeta';

    @column({consume: value => Str.toString(value)})
    public productMasterId: string;

    @column()
    public metaKey: string;

    @column()
    public metaValue: string;
}