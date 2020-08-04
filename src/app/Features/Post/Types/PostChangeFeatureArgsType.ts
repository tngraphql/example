import {ArgsType, Field} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {PostModel} from "../PostModel";
import {GraphQLBoolean} from "graphql";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/19/2020
 * Time: 9:02 PM
 */

@ArgsType()
export class PostChangeFeatureArgsType {
    @Field(returns => ID, {description: 'ID bài viết',})
    @Rules([
        'required',
        Rule.exists(PostModel.getTable(), 'id')
    ])
    public id?: string

    @Field(returns => GraphQLBoolean)
    public isFeatured?: boolean;
}