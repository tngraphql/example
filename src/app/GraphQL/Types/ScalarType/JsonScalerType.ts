/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 3:03 PM
 */
import {GraphQLScalarType} from "graphql";

export const JSONScalarType = new GraphQLScalarType({
    name: 'Any',

    description: 'JSON data',

    parseValue(value: string) {
        return value;
    },
    serialize(value) {
        if ( typeof value === 'string' ) {
            return JSON.parse(value);
        }
        return value;
    },
    parseLiteral(ast) {
        return ast['value'];
    },
});

export const JSONType = JSONScalarType;