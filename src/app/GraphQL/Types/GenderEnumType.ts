/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 1:21 PM
 */
import { registerEnumType } from '@tngraphql/graphql';

export enum GenderEnumType {
    male = '1',
    female = '2',
}

registerEnumType(GenderEnumType, { name: 'GenderEnum' });