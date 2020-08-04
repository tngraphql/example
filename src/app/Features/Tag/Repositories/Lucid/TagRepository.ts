/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "../../../../../Repositories/Lucid/BaseRepository";
import {Service} from "@tngraphql/illuminate";
import TagModel from "../../TagModel";
import * as _ from 'lodash'
import Arr from "../../../../../lib/Arr";

@Service()
export class TagRepository extends BaseRepository<TagModel> {
    public model(): typeof TagModel {
        return TagModel;
    }

    public async upsert(tagsName: string[]): Promise<any[]> {
        tagsName = _.uniq(Arr.array_wrap(tagsName));

        if ( ! tagsName.length ) {
            return [];
        }

        const listTag = await this.newQuery().whereIn('name', tagsName);

        type K<T> = T[];

        const res: K<string|number> = [];

        for( const name of tagsName ) {
            const tag = listTag.find(tag => tag.name === name);

            if ( tag ) {
                res.push(tag.id);
            } else {
                // Nếu tag chưa tồn tại, chúng ta tạo mới tag.
                const tagNew = await this.create({name});

                res.push(tagNew.id);
            }
        }

        return res;
    }
}
