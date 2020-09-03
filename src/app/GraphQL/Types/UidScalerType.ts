/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 3:03 PM
 */
import { GraphQLScalarType } from 'graphql';

export const UidScalarType = new GraphQLScalarType({
    name: 'ID_CRYPTO',

    description: 'Number Or String',

    parseValue(value: string) {
        return (value !== null || value !== undefined)
            ? value.toString()
            : null;
    },
    serialize(value: Date) {
        return (value !== null || value !== undefined)
            ? value.toString()
            : null;
    },
    parseLiteral(ast) {
        switch (ast.kind) {
            // Implement your own behavior here by returning what suits your needs
            // depending on ast.kind
        case 'StringValue':
            return ast.value;
        case 'IntValue':
            return String(ast.value);
        default:
            return null;
        }
    },
});

export const ID = UidScalarType;