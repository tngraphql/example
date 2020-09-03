/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import MediaModel from '../MediaModel';

@ArgsType()
export class MediaCreateArgsType {
    @Field({ description: 'Tên thẻ nhãn' })
    @Rules(args => ([
        'required',
        'regex:/^([^\\\/\:\?\*\"\<\>\|]*)$/g',
        Rule.unique(MediaModel.getTable(), 'title').where('folder_name', args.folderName || null)
    ]), ({ lang }) => ({
        'regex': lang.t(`A folder name can\'t contain any of the following characters`) + ': \/:*?"<>|'
    }))
    public title: string

    @Field({ description: 'Slug là phiên bản thân thiện với URL của tên.' })
    public folderName: string

    public mineType = 'folder';
}