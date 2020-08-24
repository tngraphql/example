/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/29/2020
 * Time: 6:53 AM
 */
import {createParamDecorator} from "@tngraphql/graphql";
import {getMetadataStorage} from "@tngraphql/graphql/dist/metadata/getMetadataStorage";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {IFieldSelection, ResolveInfo} from "../lib/ResolveInfo";
import {GraphQLOutputType, GraphQLResolveInfo} from "graphql";
import {ISelection} from "../Contracts/SelectionCriteriaContract";
import {GraphQLList, GraphQLNonNull} from "graphql/type/definition";
const _ = require('lodash');

export const SelectFields = () => {
    return createParamDecorator<{app: any}>(({info, context}) => {
        return getFields(info, context.app ? context.app.config.get('app').depthLimit : 5);
    });
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

export function getFields(info: GraphQLResolveInfo, depth: number = 5): ISelection {
    let type = getType(info.returnType);

    const returnType = getMetadataStorage().objectTypes.find(x => x.name === type);

    const isPaginate: boolean = returnType?.target['isPageType'] === true;

    if (isPaginate) {
        const fields = getFieldSelection(info, depth + 1);

        const model = returnType.fields.find(x => x.name === 'data').getType()['model'];

        return getField(fields.data, model);
    }

    return getField(getFieldSelection(info, depth), returnType.target['model'] as LucidModel);
}

export function getFieldSelection(info: GraphQLResolveInfo, depth: number = 0): IFieldSelection {
    const rinfo = new ResolveInfo(info);
    return rinfo.getFieldSelection(depth);
}

export function getField(fields, model: LucidModel): ISelection {
    const result = [];
    const preloads = [];

    for( const field in fields ) {
        if ( ! _.isObject(fields[field]) ) {
            if ( ! model ) {
                result.push(field);
                continue;
            }

            result.push(model.qualifyColumn(model.primaryKey));

            if (model.$hasColumn(field)) {
                result.push(model.qualifyColumn(field));
            }
            if (model.$hasRelation(field)) {
                const relation: any = getRelation(model, field);

                result.push(model.qualifyColumn(relation.localKey));

                if (['belongsTo'].includes(relation.type)) {
                    result.push(model.qualifyColumn(relation.foreignKey));
                }

                preloads.push({
                    name: field
                });
            }
        } else {
            if (model.$hasRelation(field)) {
                const relation: any = getRelation(model, field);

                let relatedModel = relation.relatedModel();
                result.push(model.qualifyColumn(relation.localKey));
                if (['belongsTo'].includes(relation.type)) {
                    result.push(model.qualifyColumn(relation.foreignKey));
                }

                if (relation.type === 'morphTo') {
                    preloads.push({
                        name: field
                    });

                    continue;
                }

                preloads.push({
                    name: field,
                    ...getField(fields[field], relatedModel)
                });
            }
        }
    }

    return {
        columns: Array.from(new Set(result)),
        preloads
    }
}

function getRelation(model: LucidModel, name: string) {
    const relation: any = model.$getRelation(name);
    relation.boot();

    return relation;
}