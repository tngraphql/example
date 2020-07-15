import {Field, Int, ObjectType} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import CategoryModel from "../CategoryModel";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../GraphQL/Types/PaginateType";
import {CategoryOtherLanguageType} from "./CategoryOtherLanguageType";
import {CategoryMetaType} from "./CategoryMetaType";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Category')
export class CategoryType {
    static model = CategoryModel

    @Field(returns => ID)
    public id: string

    @Field()
    public name: string;

    @Field()
    public description: string;

    @Field(returns => ID)
    public parentId: string;

    @Field()
    public slug: string;

    @Field(returns => Int)
    public categoryOrder: number;

    @Field(returns => ID)
    public language: string;

    @Field(returns => ID)
    public languageMaster: string;

    @Field(returns => [CategoryOtherLanguageType])
    public otherLanguages: CategoryOtherLanguageType[];

    @Field(returns => [CategoryMetaType])
    public meta: CategoryMetaType[];

    @Field()
    public seoTitle: string;

    @Field()
    public seoDescription: string;

    @Field()
    public seoKeyword: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(CategoryType);