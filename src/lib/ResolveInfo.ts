/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 4:04 PM
 */

import { empty, merge } from './utils';
import { GraphQLResolveInfo } from 'graphql';
import {
    FieldNode,
    FragmentDefinitionNode,
    OperationDefinitionNode,
    SelectionSetNode
} from 'graphql/language/ast';
import { GraphQLObjectType, GraphQLOutputType } from 'graphql/type/definition';
import { Path } from 'graphql/jsutils/Path';
import { GraphQLSchema } from 'graphql/type/schema';

const { FragmentSpreadNode, InlineFragmentNode } = require('graphql');
const _ = require('lodash');

export interface IFieldSelection {
    [key: string]: boolean | IFieldSelection
}

export class ResolveInfo {
    public fieldName: any;
    public fieldNodes: ReadonlyArray<FieldNode>;
    public returnType: GraphQLOutputType;
    public parentType: GraphQLObjectType;
    public path: Path;
    public schema: GraphQLSchema;
    public rootValue: any;
    public fragments: { [key: string]: FragmentDefinitionNode };
    public operation: OperationDefinitionNode;
    public variableValues: { [variableName: string]: any };

    constructor(info: GraphQLResolveInfo) {
        const {
            fieldName,
            fieldNodes,
            returnType,
            parentType,
            path,
            schema,
            fragments,
            rootValue,
            operation,
            variableValues
        } = info;
        this.fieldName = fieldName;
        this.fieldNodes = fieldNodes;
        this.returnType = returnType;
        this.parentType = parentType;
        this.path = path;
        this.schema = schema;
        this.fragments = fragments;
        this.rootValue = rootValue;
        this.operation = operation;
        this.variableValues = variableValues;
    }

    public getFieldSelection(depth: number = 0): IFieldSelection {
        let fields = {};

        for( const fieldNode of this.fieldNodes ) {
            if ( ! fieldNode.selectionSet ) {
                continue;
            }
            fields = merge(fields, this.foldSelectionSet(fieldNode.selectionSet, depth));
        }

        return fields;
    }

    public foldSelectionSet(selectionSet: SelectionSetNode, descend: number) {
        let fields = {};
        for( const selectionNode of selectionSet.selections ) {
            if ( selectionNode.kind === 'Field' ) {
                const isSelectionSet = descend > 0 && ! this.empty(selectionNode.selectionSet);

                fields[selectionNode.name.value] = isSelectionSet ? this.foldSelectionSet(selectionNode.selectionSet, descend - 1) : true;

            } else if ( selectionNode.kind === 'FragmentSpread' ) {
                const spreadName = selectionNode.name.value;
                if ( this.fragments[spreadName] ) {
                    const fragment = this.fragments[spreadName];
                    fields = merge(
                        this.foldSelectionSet(fragment.selectionSet, descend),
                        fields
                    );
                }
            } else if ( selectionNode.kind === 'InlineFragment' ) {
                fields = merge(
                    this.foldSelectionSet(selectionNode.selectionSet, descend),
                    fields
                );
            }
        }
        return fields;
    }

    protected empty(mixedVar) {
        return empty(mixedVar);
    }
}