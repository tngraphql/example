/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/19/2020
 * Time: 9:08 PM
 */
import {Inject, InvalidArgumentException, Service} from "@tngraphql/illuminate";
import CommentModel from "./CommentModel";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import {ResolveAuth} from "../../../decorators/ResolveAuth";
import {LucidRow, ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {CommentStatusEnumType} from "./Types/CommentStatusEnumType";
import {ConfigOptions} from "../../../lib/ConfigOptions";
import {DateTime} from "luxon";
import {PostRepository} from "../Post/Repositories/PostRepository";
import {Str} from "../../../lib/Str";
import {AuthContract} from "@tngraphql/auth/dist/src/Contract/AuthContract";

@Service()
export class CommentRepository extends BaseRepository<CommentModel>  {
    @ResolveAuth()
    protected auth: AuthContract;

    @Inject(type => PostRepository)
    protected post: PostRepository

    public model(): typeof CommentModel {
        return CommentModel;
    }

    /**
     * Search các từ trong mảng b có trong mảng a hay không?
     *
     * @param body
     * @param blackList
     * @returns {boolean}
     */
    public searchTerms(body, blackList) {
        return blackList.some(function(str) {
            return body.indexOf(str) !== -1;
        });
    }

    /**
     * Check các từ cấm trên settings
     *
     * @param body
     * @param key
     * @returns {boolean}
     */
    public async checkBlackList(body, key = 'commentBlacklistKeys') {
        const blacklist = (await ConfigOptions.getOption(key) || '').split(/\n/g);

        return this.searchTerms(body, blacklist);
    }

    async create(data: Partial<ModelAttributes<CommentModel>>): Promise<CommentModel> {
        return this.transaction(async () => {
            const blacklist = [];

            const body = data.body.split(/\s/g);

            data.status = CommentStatusEnumType.approved;

            // Nếu cài đặt bắt phải kiểm duyệt.
            if ( !! Number(await ConfigOptions.getOption('commentModeration')) ) {
                data.status = CommentStatusEnumType.pending;
            }

            // Kiểm tra từ cấm.
            if ( await this.checkBlackList(body, 'commentBlacklistKeys') ) {
                data.status = CommentStatusEnumType.trash;
            }

            // Kiểm tra từ nhạy cảm.
            if ( data.status === CommentStatusEnumType.approved && await this.checkBlackList(body, 'commentModerationKeys') ) {
                data.status = CommentStatusEnumType.pending;
            }

            if ( await this.auth.check() ) {
                data.authorId = await this.auth.id() as string;
            }

            if ( data.status === CommentStatusEnumType.approved ) {
                data.publishedAt = DateTime.local();
            }

            const created = await super.create(data);

            if ( created && created.status === CommentStatusEnumType.approved ) {
                await this.updateCommentCount(created, 1);
            }

            return created;
        });
    }

    async update(data: Partial<ModelAttributes<CommentModel>>, value: any, attribute: string = this.getKeyName()): Promise<CommentModel> {
        return this.transaction(async () => {
            const query = this.newQuery();

            const comment = await query.where(attribute, '=', value).firstOrFail();

            comment.merge(data);

            const previousStatus: string = comment.$original.status;
            const updateStatus: string = comment.status;

            const isUpdateStatus: boolean = previousStatus !== updateStatus;

            if ( isUpdateStatus ) {
                // Có update trạng thái.

                if ( updateStatus === CommentStatusEnumType.approved ) {
                    // Trạng thái mới là Đã duyệt
                    await this.updateCommentCount(comment, 1);
                }

                if ( previousStatus === CommentStatusEnumType.approved ) {
                    // Trạng thái mới bị hủy Duyệt.
                    await this.updateCommentCount(comment, -1);
                }
            }

            await comment.save();

            return comment;
        })
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            const comment = id instanceof CommentModel ? id : (await this.newQuery().where(attribute, id).firstOrFail());

            if (comment.status === CommentStatusEnumType.approved) {
                await this.updateCommentCount(comment, -1);
            }

            return super.delete(id, attribute);
        });
    }

    /**
     * Cập nhật số lượng comment
     *
     * @param commentableId
     * @param count
     */
    public updateCommentCount(comment: CommentModel, count: number): Promise<any> {
        const method = `update${Str.ucFirst(comment.commentableType)}CommentCount`;

        if (typeof this[method] !== 'function') {
            throw new InvalidArgumentException(`Comment type ${comment.commentableType} is not defined.`);
        }

        return this[method](comment.commentableId, count);
    }

    protected updatePostCommentCount(commentableId, count) {
        return this.post.updateCommentCount(commentableId, count);
    }
}