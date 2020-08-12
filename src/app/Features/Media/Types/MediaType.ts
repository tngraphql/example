import {Field, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import MediaModel from "../../../Models/MediaModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/5/2020
 * Time: 11:03 AM
 */

@ObjectType('Media')
export class MediaType {
    static model = MediaModel

    @Field(returns => ID)
    public id: string

    @Field()
    public title: string;
}