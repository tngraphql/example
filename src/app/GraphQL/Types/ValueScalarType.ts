import {GraphQLScalarType, Kind} from "graphql";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 6:29 PM
 */

export const ValueScalarType = new GraphQLScalarType({
    name: 'DateTime',
    description: 'String Or Number Or Many String | Number',
    parseValue(value: string) {
        return value ? value.toString() : null;
    },
    serialize(value: any) {
        return value ? value.toString() : null;
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