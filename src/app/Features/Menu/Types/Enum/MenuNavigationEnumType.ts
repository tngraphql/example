/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 6:00 PM
 */

import { registerEnumType } from '@tngraphql/graphql';

enum MenuNavigationEnumType {
    main = 'mainNavigation', // Main Navigation
    header = 'headerNavigation', // Header Navigation
    footer = 'footerNavigation', // footer Navigation
}

registerEnumType(MenuNavigationEnumType, {
    name: 'MenuNavigationEnum',
    description: 'Loại liên kết menu.'
});

export { MenuNavigationEnumType };