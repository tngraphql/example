/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {registerFilterEnumType} from "../../../../GraphQL/Types/FilterType";
import {converBoolean} from "../../../../../lib/utils";
import {UserModel} from "../../../../UserModel";

enum PostFilterEnumType {
    id = 'id',
    format = 'format',
    // isFeatured = 'isFeatured',
    views = 'views',
    commentStatus = 'commentStatus',
    commentCount = 'commentCount',
    name = 'name',
    authorId = 'authorId',
    parentId = 'parentId',
    slug = 'slug',
    postStatus = 'postStatus',
    description = 'description',
    content = 'content',
    language = 'language',
    languageMaster = 'languageMaster',
    publishedAt = 'publishedAt',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt',
    categoryId = 'categories.id',
    categorySlug = 'categories.slug',
    tagId = 'tags.id',
    tagSlug = 'tags.slug',
    authorEmail = 'author.email',
    authorPhone = 'author.phone'
}

namespace PostFilterEnumType {
    // export const categoryId = function (val, operation) {
    //     return query => query.whereHas(
    //         'categories',
    //         query => query.where(query.qualifyColumn('id'), operation, val)
    //     );
    // }
    //
    // export const categorySlug = function categorySlug(val, op) {
    //     return query => query.whereHas(
    //         'categories',
    //         query => query.where(query.qualifyColumn('slug'), op, val)
    //     );
    // }

    // export const tagId = function tagId(val, operation) {
    //     return query => query.whereHas(
    //         'tags',
    //         query => query.where(query.qualifyColumn('id'), operation, val)
    //     );
    // }
    //
    // export const tagSlug = function tagSlug(val, op) {
    //     return query => query.whereHas(
    //         'tags',
    //         query => query.where(query.qualifyColumn('slug'), op, val)
    //     );
    // }

    export const isFeatured = function isFeatured(value, operation) {
        const val = converBoolean(String(Number(eval(value))), '1', '0');

        return query => query.where('isFeatured', operation, val);
    }

    // export const authorEmail = function authorEmail(val, op) {
    //     return query => query.whereHas('author', query => {
    //         query.where(query.qualifyColumn('email'), op, val)
    //     });
    // }
    //
    // export const authorPhone = function authorPhone(val, op) {
    //     return query => query.whereHas('author', query => {
    //         query.where(query.qualifyColumn('phone'), op, val)
    //     });
    // }
}

registerFilterEnumType('Post', PostFilterEnumType);

export {PostFilterEnumType};