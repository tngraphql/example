/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {PostModel} from "../Models/PostModel";
import {ResolveAuth} from "../../../../decorators/ResolveAuth";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {PostCreateArgsType} from "../Types/Post/PostCreateArgsType";
import {PostUpdateArgsType} from "../Types/Post/PostUpdateArgsType";
import {PostStatusEnumType} from "../Types/Post/PostStatusEnumType";
import {DateTime} from "luxon";
import Arr from "../../../../lib/Arr";
import {TagRepository} from "../../Tag/Repositories/Lucid/TagRepository";
import {PostMetaRepository} from "./PostMetaRepository";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {converBoolean} from "../../../../lib/utils";

@Service()
export class PostRepository extends BaseRepository<PostModel> {
    @ResolveAuth()
    protected auth: RequestGuard;

    @Inject(type => PostMetaRepository)
    protected meta: PostMetaRepository

    @Inject(type => TagRepository)
    protected tag: TagRepository

    public model(): typeof PostModel {
        return PostModel;
    }

    async create(data: PostCreateArgsType): Promise<PostModel> {
        data.authorId = await this.auth.id();

        return this.transaction(async () => {
            if ( data.postStatus === PostStatusEnumType.publish ) {
                data.publishedAt = DateTime.local();
                if ( String(data.parentId) !== '0' ) {
                    await this.update({ id: data.parentId }, data.parentId);
                }
            }

            // Nếu bài viết là private thì sẽ không có mật khẩu.
            if ( data.postStatus === PostStatusEnumType.private ) {
                data.postPassword = null;
            }

            const post = await super.create(data);

            const categories = data.categories || ['1'];

            await post.related('categories').sync(Arr.wrap(categories));

            await post.related('tags')
                .sync(await this.tag.upsert(data.tags));

            await this.meta.sync(data.meta, post);

            return post;
        });
    }

    async update(data: PostUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<PostModel> {
        return this.transaction(async () => {
            // Nếu bài viết là private thì sẽ không có mật khẩu.
            if ( data.postStatus === PostStatusEnumType.private ) {
                data.postPassword = null;
            }

            const post = await super.update(data, value, attribute);

            if ( data.categories ) {
                await post.related('categories').sync(Arr.array_wrap(data.categories));
            }

            await post.related('tags')
                .sync(await this.tag.upsert(data.tags));

            await this.meta.sync(data.meta, post);

            return post;
        });
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            let post = id;

            if (!(id instanceof BaseModel)) {
                post = await this.query().firstBy(id, attribute);
            }

            return super.delete(id, attribute);
        });
    }

    /**
     * Cập nhật số lượng comment
     *
     * @param id
     * @param count
     */
    async updateCommentCount(id: string | number, count: number) {
        return this.newQuery().where('id', id).increment('commentCount', count);
    }

    /**
     * Thay đổi post nổi bật.
     *
     * @param featured
     * @param id
     */
    async changeFeatured(featured: number|boolean, id: string) {
        return this.update({
            isFeatured: converBoolean(featured, 1, 0)
        }, id);
    }
}
