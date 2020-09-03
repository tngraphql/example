/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 8:12 PM
 */

import { GraphQLScalarType, Kind } from 'graphql';

export const StatusScalarType = new GraphQLScalarType({
    name: 'Status',

    description: 'Status',
    parseValue(value: string) {
        return value;
    },
    serialize(value: Date) {
        return value;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            // Implement your own behavior here by returning what suits your needs
            // depending on ast.kind
        case 'StringValue':
            return ast.value;
        case 'IntValue':
            return ast.value;
        default:
            return null;
        }
    },
});
