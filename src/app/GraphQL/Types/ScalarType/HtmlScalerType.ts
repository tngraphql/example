/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 3:03 PM
 */
import {GraphQLScalarType} from "graphql";
import {validHTML} from "../../../../lib/utils";

export const HtmlScalarType = new GraphQLScalarType({
    name: 'Html',

    description: 'Html view',

    parseValue(value: string) {
        return value ? validHTML(value.toString()) : null;
    },
    serialize(value: Date) {
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

export const HTML = HtmlScalarType;