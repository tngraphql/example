/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/29/2020
 * Time: 4:42 PM
 */
import { Application } from '@tngraphql/illuminate';
import { Kernel } from '../app/GraphQL/Kernel';
import costAnalysis from 'graphql-cost-analysis';
import { Env } from '@tngraphql/illuminate/dist/Support/Env';
import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';

const responseCachePlugin = require('apollo-server-plugin-response-cache');

const app = Application.getInstance<Application>();

const costAnalyzer = costAnalysis({
    maximumCost: Env.get('MAXINUM_COST', 2000),
    defaultCost: Env.get('DEFAULT_COST', 1),
    onComplete: (cost) => {
        // console.log('query cost: ', cost);
    }
});

const graphql: ApolloServerExpressConfig = {
    formatError: app.use('ExceptionHandler').render,
    context: context => {
        return {
            app,
            ...context
        };
    },
    playground: {
        version: '1.7.10'
    },
    validationRules: [
        costAnalyzer
    ],
    introspection: true,
    plugins: [
        {
            requestDidStart(requestContext) {
                requestContext.context.cache = requestContext.cache;
            }
        },
        responseCachePlugin()
    ],
    tracing: Env.get('TRACING', false),
    engine: Env.get('ENGINE', false),
    persistedQueries: {}
};

export = graphql;