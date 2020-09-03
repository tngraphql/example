/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 3:03 PM
 */
import { GraphQLScalarType } from 'graphql';

export const AnyScalarType = new GraphQLScalarType({
    name: 'Any',

    description: 'Any data',

    parseValue(value: string) {
        return value;
    },
    serialize(value: Date) {
        return value;
    },
    parseLiteral(ast) {
        return ast['value'];
    },
});

export const Any = AnyScalarType;