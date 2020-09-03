/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/30/2020
 * Time: 11:19 AM
 */
import { DocumentNode, GraphQLFormattedError } from 'graphql';
import { Response } from 'apollo-server-env';

type StringOrAst = string | DocumentNode;

// A query must not come with a mutation (and vice versa).
type Query = {
    query: StringOrAst;
    mutation?: undefined;
    variables?: {
        [name: string]: any;
    };
    operationName?: string;
};
type Mutation = {
    mutation: StringOrAst;
    query?: undefined;
    variables?: {
        [name: string]: any;
    };
    operationName?: string;
};

type Mutable<T> = { -readonly [P in keyof T]: T[P] };

interface GraphQLFormattedError2 extends GraphQLFormattedError {
    readonly validation: any
}

export interface GraphQLResponse {
    data?: Record<string, any> | null;
    errors?: ReadonlyArray<GraphQLFormattedError2>;
    extensions?: Record<string, any>;
    http?: Pick<Response, 'headers'> & Partial<Pick<Mutable<Response>, 'status'>>;
}

export interface ApolloServerTestClient {
    query: (query: Query) => Promise<GraphQLResponse>;
    mutate: (mutation: Mutation) => Promise<GraphQLResponse>;
}