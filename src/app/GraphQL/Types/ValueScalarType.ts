import { GraphQLScalarType, Kind } from 'graphql';
import { empty } from '../../../lib/utils';
import Arr from '../../../lib/Arr';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 6:29 PM
 */

export const ValueScalarType = new GraphQLScalarType({
    name: 'ValueType',

    description: 'String Or Number Or Many String | Number',

    parseValue(value: string) {
        if ( typeof value === 'boolean' ) {
            return value
        }

        return ! empty(value) ? value.toString() : value
    },

    serialize(value: any) {
        return value ? value.toString() : value;
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
            return ast['value'];
        }
    },
});