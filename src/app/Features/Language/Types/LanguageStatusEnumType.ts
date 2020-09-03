/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/24/2020
 * Time: 8:07 AM
 */

import { registerEnumType } from '@tngraphql/graphql';

export enum LanguageStatusEnumType {
    publish = 'publish',
}

registerEnumType(LanguageStatusEnumType, { name: 'LanguageStatusEnum' });