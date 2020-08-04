/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/16/2020
 * Time: 2:03 PM
 */

import {registerEnumType} from "@tngraphql/graphql";

export enum ContentFormatEnumType {
    TEXT = 'TEXT',
    HTML = 'HTML'
}

registerEnumType(ContentFormatEnumType, {name: 'ContentFormatEnum', description: 'Format Text'});