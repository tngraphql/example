/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/25/2020
 * Time: 8:22 AM
 */
import {
    MorphOneRelationOptions,
    MorphTo,
} from '@tngraphql/lucid/build/src/Contracts/Orm/Relations/types';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { TypedDecorator } from '@tngraphql/lucid/build/src/Contracts/Model/types';

/**
 * Decorator signature to define morph to relationship
 */
export type MorphByDecorator = <RelatedModel extends LucidModel>(
    model: (() => RelatedModel),
    options?: MorphOneRelationOptions<MorphTo<RelatedModel>>
) => TypedDecorator<MorphTo<RelatedModel>>

/**
 * Define morphTo relationship
 */
export const morphBy: MorphByDecorator = (relatedModel, relation) => {
    return function decorateAsRelation(target, property: string) {
        const Model = target.constructor as LucidModel
        Model.bootIfNotBooted();

        const name = relation.name;
        const type = relation.type ? relation.type : name + 'Type';
        const id = relation.id ? relation.id : name + 'Id';
        relation.localKey = relation.localKey || 'id';

        Model.$addRelation(property, 'morphTo', relatedModel, Object.assign({ relatedModel }, relation, {
            type,
            id
        }))
    }
}