import {Query, Resolver, UseMiddleware} from '@tngraphql/graphql';
import { GraphQLString } from 'graphql';
import {Filter} from "../Middleware/Filter";

@Resolver()
export class MonyResolve {

    @Query(returns => GraphQLString)
    @UseMiddleware(Filter)
    async index() {
        //
        return '';
    }
}
