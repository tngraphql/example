/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/5/2020
 * Time: 11:03 AM
 */

import { Field, ObjectType, Root } from '@tngraphql/graphql';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import MediaModel from '../MediaModel';
import { Any } from '../../../GraphQL/Types/ScalarType/AnyScalerType';
import { TimestampScalarType } from '../../../GraphQL/Types/TimestampScalarType';
import { DateTime } from 'luxon';
import { registerPaginateType } from '../../../GraphQL/Types/PaginateType';

@ObjectType('Media')
export class MediaType {
    static model = MediaModel

    @Field(returns => ID)
    public id: string

    @Field({})
    public status: string;

    @Field({})
    public title: string;

    @Field(returns => ID)
    public guid: string;

    @Field({})
    public src: string;

    @Field({})
    public srcMd5: string;

    @Field({})
    public rootId: string;

    @Field({})
    public filesize: string;

    @Field({})
    public folderName: string;

    @Field({})
    public mineType: string;

    @Field({})
    public thumbnail(@Root() parent): string {
        let data: any = {};
        try {
            data = JSON.parse(parent.thumbnail);
        } catch (e) {
            // code
        }
        if ( data && data.sizes && data.sizes.thumbnail ) {
            return data.sizes.thumbnail.guid;
        }

        return parent.guid;
    };

    @Field(returns => Any)
    public data(@Root() parent): any {
        try {
            return JSON.parse(parent.data);
        } catch (e) {
            return {};
        }
    };

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}

registerPaginateType(MediaType);