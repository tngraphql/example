/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import { Arg, Ctx, Directive, Field, Int, ObjectType, Root } from '@tngraphql/graphql';
import { DateTime } from 'luxon';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import { TimestampScalarType } from '../../../GraphQL/Types/TimestampScalarType';
import { registerPaginateType } from '../../../GraphQL/Types/PaginateType';
import { MenuModel } from '../MenuModel';
import { MenuOtherLanguageType } from './MenuOtherLanguageType';
import { MenuItemType } from './MenuItemType';
import { MenuStatusEnumType } from './Enum/MenuStatusEnumType';
import { NavigationType } from './NavigationType';
import { ConfigOptions } from '../../../../lib/ConfigOptions';

@ObjectType('Menu')
export class MenuType {
    static model = MenuModel

    @Field(returns => ID)
    public id: string

    @Field({ description: 'Tên menu ' })
    public name: string

    @Field()
    public alias: string

    @Field({ description: 'Mô tả menu ' })
    public description: string

    @Field(returns => MenuStatusEnumType, { description: 'Trạng thái menu' })
    public status: string

    @Field(returns => [MenuItemType], { description: 'Thông tin menu item' })
    public menuItems: MenuItemType[]

    @Field(returns => ID, { description: 'ID ngôn ngữ ' })
    public language: string;

    @Field(returns => ID, { description: 'ID ngôn ngữ được tạo ra đầu tiên' })
    public languageMaster: string;

    @Field(returns => [MenuOtherLanguageType], { description: 'Những ngôn ngữ khác' })
    public otherLanguages: MenuOtherLanguageType[];

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime

    @Field(returns => NavigationType, { description: 'Header Navigation', })
    public async headerNavigation(@Root() parent): Promise<NavigationType | null> {
        let value = await ConfigOptions.getOption('headerNavigation');
        value = value[parent.language];

        if ( ! value ) {
            return null;
        }

        return MenuModel.query().where('id', value).first();
    };

    @Field(returns => NavigationType, { description: 'Header Navigation', })
    public async mainNavigation(@Root() parent): Promise<NavigationType | null> {
        let value = await ConfigOptions.getOption('mainNavigation');
        value = value[parent.language];

        if ( ! value ) {
            return null;
        }

        return MenuModel.query().where('id', value).first();
    };

    @Field(returns => NavigationType, { description: 'Header Navigation', })
    public async footerNavigation(@Root() parent): Promise<NavigationType | null> {
        let value = await ConfigOptions.getOption('footerNavigation');
        value = value[parent.language];

        if ( ! value ) {
            return null;
        }

        return MenuModel.query().where('id', value).first();
    };

    @Field({ description: 'Automatically add new top-level pages to this menu' })
    public automanticallyMenu: boolean;
}

registerPaginateType(MenuType);