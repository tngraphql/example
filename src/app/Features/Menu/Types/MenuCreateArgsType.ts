/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import { MenuStatusEnumType } from './Enum/MenuStatusEnumType';
import { MenuItemInputType } from './MenuItemInputType';

@ArgsType()
export class MenuCreateArgsType {
    @Field({ description: 'Tên bài viết' })
    @Rules(args => ([
        'required',
        'max:120'
    ]))
    public name: string

    @Field(returns => ID, { description: 'Id ngôn ngữ' })
    @Rules(['filled'])
    public language: string;

    @Field(returns => ID, { description: 'ID ngôn ngữ chính.' })
    @Rules(['filled'])
    public languageMaster: string;

    @Field(returns => MenuStatusEnumType, {
        description: 'Trạng thái menu',
        defaultValue: MenuStatusEnumType.publish
    })
    public status: string;

    @Field(returns => [MenuItemInputType], { description: 'Thông tin menuitem' })
    public menuItems: MenuItemInputType[];
}