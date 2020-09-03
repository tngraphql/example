/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import MediaModel from '../MediaModel';

@ArgsType()
export class MediaUpdateArgsType {
    @Field(returns => ID, { description: 'ID. media' })
    @Rules([
        'required',
        Rule.exists(MediaModel.getTable(), 'id')
    ])
    public id: string

    @Field({ description: 'Tên thẻ nhãn' })
    @Rules(args => ([
        'filled',
        Rule.unique(MediaModel.getTable(), 'title')
            .where('folder_name', args.folderName || null)
            .ignore(args.id)
    ]))
    public title: string

}