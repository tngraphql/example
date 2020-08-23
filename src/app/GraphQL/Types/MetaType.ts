/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 4:54 PM
 */
import {Field, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "./UidScalerType";
import {Any} from "./ScalarType/AnyScalerType";
import MediaModel from "../../Models/MediaModel";

@ObjectType('Meta')
export class MetaType {
    @Field(returns => ID)
    public id: string

    @Field({description: 'Key'})
    public metaKey: string;

    @Field(returns => Any, {description: 'Giá trị'})
    public async metaValue(@Root() parent) {
        try {
            const value = JSON.parse(parent.metaValue);

            if ( value.thumbnailId ) {

                const media = await MediaModel.findBy('id', value.thumbnailId);

                if ( media ) {
                    const { guid, data, title } = media.toJSON();

                    let djson = {};
                    try {
                        djson = JSON.parse(data);
                    } catch (e) {
                        // console.log(e);
                    }

                    return { guid, data: djson, title, thumbnailId: value.thumbnailId };
                }
            }

            return value;
        } catch (e) {
            return parent.metaValue;
        }
    };
}