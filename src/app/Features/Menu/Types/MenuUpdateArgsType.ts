import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import { MetaInput } from '../../../GraphQL/Types/Input/MetaInput';
import { GraphQLString } from 'graphql';
import { MenuModel } from '../MenuModel';
import { MenuStatusEnumType } from './Enum/MenuStatusEnumType';
import { MenuItemInputType } from './MenuItemInputType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */

@ArgsType()
export class MenuUpdateArgsType {
    @Field(returns => ID, { description: 'ID bài viết', })
    @Rules([
        'required',
        Rule.exists(MenuModel.getTable(), 'id')
    ])
    public id?: string

    @Field({ description: 'Tên bài viết' })
    @Rules(args => ([
        'filled',
        'max:120'
    ]))
    public name: string

    @Field(returns => MenuStatusEnumType, {
        description: 'Trạng thái menu',
        defaultValue: MenuStatusEnumType.publish
    })
    public status: string;

    @Field(returns => [MenuItemInputType], { description: 'Thông tin menuitem' })
    public menuItems: MenuItemInputType[];

    @Field(returns => ID, { description: 'Header Navigation' })
    public headerNavigation: string;

    @Field(returns => ID, { description: 'Main Navigation' })
    public mainNavigation: string;

    @Field(returns => ID, { description: 'Footer Navigation' })
    public footerNavigation: string;

    @Field({ description: 'Automatically add new top-level pages to this menu' })
    public automanticallyMenu: boolean;
}