/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/5/2020
 * Time: 9:46 AM
 */
import {registerFilterEnumType} from "../../../GraphQL/Types/FilterType";

enum CategoryFilterEnumType {
    id = 'id',
    name = 'name',
    description = 'description',
    parentId = 'parentId',
    slug = 'slug',
    categoryOrder = 'categoryOrder',
    language = 'language',
    languageMaster = 'languageMaster',
    seoTitle = 'seoTitle',
    seoDescription = 'seoDescription',
    seoKeyword = 'seoKeyword',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt'
}

registerFilterEnumType('Category', CategoryFilterEnumType);

export {CategoryFilterEnumType};