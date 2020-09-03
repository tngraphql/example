/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/4/2020
 * Time: 7:34 AM
 */
import { GraphQLScalarType, Kind } from 'graphql';
import { DateTime } from 'luxon'

export const TimestampScalarType = new GraphQLScalarType({
    name: 'Timestamp',
    description: 'Date format W3C',

    parseValue(value: string) {
        return DateTime.fromSQL(value)
    },
    serialize(value: DateTime) {
        if ( ! (value instanceof DateTime) ) {
            throw new Error(`Unable to serialize value '${ value }' as it's not instance of 'Date'`);
        }
        return value;
    },
    parseLiteral(ast) {
        if ( ast.kind === Kind.STRING ) {
            return ast.value;
        }
        return null;
    },
});

export const Timestamp = TimestampScalarType;