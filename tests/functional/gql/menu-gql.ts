/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/16/2020
 * Time: 5:12 PM
 */

const { gql } = require('apollo-server');

export const MENU_LIST_QUERY = gql`
query menus($page: Int, $sortBy: [MenuSort], $filter: MenuFilter, $limit: Int = 20) {
    menus(page: $page, sortBy: $sortBy, filter: $filter,limit: $limit) {
        to
        total
        currentPage
        perPage
        data {
            id
            name
            alias
            description
            status
            menuItems {
                id
                menuId
                title
                link
                icon
                className
                target
                image
                objectType
                objectId
                objectItem {
                    id
                    name
                    slug
                }
                parentId
                sort
                createdAt
                updatedAt
            }
            language
            languageMaster
            otherLanguages {
                id
                language
                languageMaster
            }
            createdAt
            updatedAt
            deletedAt
        }
    }
}
`;

export const MENU_QUERY = gql`
query menu($filter: MenuFilter, $sortBy: [MenuSort]) {
        menu(filter: $filter, sortBy: $sortBy) {
            id
            name
            headerNavigation {
                id
                name
            }
            mainNavigation {
                id
                name
            }
            footerNavigation {
                id
                name
            }
            automanticallyMenu
            alias
            description
            status
            menuItems {
                id
                menuId
                title
                link
                icon
                className
                target
                image
                objectType
                objectId
                objectItem {
                    id
                    name
                    slug
                }
                parentId
                sort
                createdAt
                updatedAt
            }
            language
            languageMaster
            otherLanguages {
                id
                language
                languageMaster
            }
            createdAt
            updatedAt
            deletedAt
        }
    }`;
