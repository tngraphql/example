import {Service} from "@tngraphql/illuminate";
import {BaseRepository} from "./BaseRepository";
import RoleModel from "../../app/Models/RoleModel";
import * as util from "util";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel/BaseModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import { Database } from '@tngraphql/illuminate/dist/Support/Facades';
import {LucidRow} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/14/2020
 * Time: 9:56 AM
 */

@Service()
export class MetableRepository<T extends LucidRow = LucidRow> extends BaseRepository<T> {
    protected instanceKey = 'categoryId';

    public model(): LucidModel {
        throw new Error('Not found model');
        return '' as any;
    }

    /**
     * Đồng bộ meta
     */
    public async upsert(meta: any[], instance: { id: string }) {
        if ( ! Array.isArray(meta) ) {
            return;
        }

        const metaKey = meta.map((m) => (m.metaKey));

        await this.newQuery()
            .whereNotIn('metaKey', metaKey)
            .where(this.instanceKey, instance.id)
            .delete();

        await Promise.all(meta.map(item => {
            return this.tup({
                [this.instanceKey]: instance.id,
                ...item
            });
        }));
    }

    public async tup(data: any) {
        const model = this.model();

        const instance: any = new model();

        data = instance.prepareForAdapter(data);

        const insert = model
            .$adapter
            .modelConstructorClient(model)
            .insertQuery()
            .table(model.getTable())
            .insert(data);

        const dataClone = Object.assign({}, data);
        delete dataClone.id;

        const update = model.query().update(dataClone)
        const query = util.format('%s ON DUPLICATE KEY UPDATE %s',
            insert.toQuery(),
            update.toQuery().replace(/^update\s.*\sset\s/i, '')
        );

        return Database.rawQuery(query);
    }
}