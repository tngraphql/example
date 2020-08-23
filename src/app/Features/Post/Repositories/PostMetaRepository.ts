/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/14/2020
 * Time: 9:57 AM
 */
import {MetableRepository} from "../../../../Repositories/Lucid/MetableRepository";
import {Service} from "@tngraphql/illuminate";
import PostmetaModel from "../PostmetaModel";

@Service()
export class PostMetaRepository extends MetableRepository {
    protected instanceKey = 'postId';

    public model(): typeof PostmetaModel {
        return PostmetaModel;
    }

    public async sync(meta: any[], instance: { id: string }): Promise<void> {
        return this.upsert(meta, instance);
    }
}