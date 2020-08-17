/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import {MiddlewareInterface, NextFn, ResolverData} from "@tngraphql/graphql";
import {getMetadataStorage} from "@tngraphql/graphql/dist/metadata/getMetadataStorage";
import {GraphQLError, GraphQLOutputType, GraphQLResolveInfo} from "graphql";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
import {SelectionNode} from "graphql/language/ast";
import {empty} from "../../../lib/utils";
import Arr from "../../../lib/Arr";
const { gql } = require('apollo-server');

export class DephLimitMiddleware implements MiddlewareInterface<{app: any}> {
    public async handle({info, context}: ResolverData<{app: any}>, next: NextFn, args: any): Promise<any> {
        if (!['Query', 'Mutation'].includes(info.parentType.toString())) {
            return next();
        }

        depthLimit(info, context.app.config.get('app').depthLimit);

        await next();
    }
}

function getType(type: GraphQLOutputType) {
    let res = type.toString();
    if (type instanceof GraphQLNonNull) {
        return getType(type.ofType);
    } else if (type instanceof GraphQLList) {
        return getType(type.ofType);
    }
    return res;
}

export function depthLimit(info: GraphQLResolveInfo, depth: number = 5) {
    let type = getType(info.returnType);

    const returnType = getMetadataStorage().objectTypes.find(x => x.name === type);

    const isPaginate: boolean = returnType?.target?.name === 'PageType';

    let depthSoFar = 0;

    if (isPaginate) {
        depthSoFar = depthSoFar - 1;
    }

    for (let node of info.fieldNodes) {
        determineDepth(node, info.fragments, depthSoFar, depth, info.operation.name.value);
    }
}

function determineDepth(node: SelectionNode, fragments, depthSoFar, maxDepth, operationName, options: any = {}) {
    if (depthSoFar > maxDepth) {
        throw new GraphQLError(`'${operationName}' exceeds maximum operation depth of ${maxDepth}`, [ node ])
    }

    switch (node.kind) {
        case "Field":
            // by default, ignore the introspection fields which begin with double underscores
            const shouldIgnore = /^__/.test(node.name.value) || seeIfIgnored(node, options.ignore)

            if (shouldIgnore || !node.selectionSet) {
                return 0
            }

            return 1 + Math.max(...node.selectionSet.selections.map(selection =>
                determineDepth(selection, fragments, depthSoFar + 1, maxDepth, operationName, options)
            ))
            break;
        case "FragmentSpread":
            return determineDepth(fragments[node.name.value], fragments, depthSoFar, maxDepth, operationName, options);
            break;
        case "InlineFragment":
            return Math.max(...node.selectionSet.selections.map(selection =>
                determineDepth(selection, fragments, depthSoFar, maxDepth, operationName, options)
            ))
            break;
        default:
            throw new Error('uh oh! depth crawler cannot handle: ' + node['kind'])
    }
}

function seeIfIgnored(node, ignore) {
    for (let rule of Arr.wrap(ignore)) {
        const fieldName = node.name.value
        switch (rule.constructor) {
            case Function:
                if (rule(fieldName)) {
                    return true
                }
                break
            case String:
            case RegExp:
                if (fieldName.match(rule)) {
                    return true
                }
                break
            default:
                throw new Error(`Invalid ignore option: ${rule}`)
        }
    }
    return false
}