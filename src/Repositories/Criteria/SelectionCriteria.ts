/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/28/2020
 * Time: 9:54 PM
 */
import { Criteria } from './Criteria';
import { ModelQueryBuilderContract } from '@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { BaseRepository } from '../Lucid/BaseRepository';
import { IRelation, ISelection } from '../../Contracts/SelectionCriteriaContract';

export class SelectionCriteria extends Criteria {
    constructor(protected _selections: ISelection) {
        super();
    }

    public apply(query: ModelQueryBuilderContract<LucidModel>, repository: BaseRepository) {
        query.clearSelect();
        query.select(this._selections.columns);
        this.preloadNested(query, this._selections.preloads);
    }

    public preloadNested(query, preloads: IRelation[]) {
        if ( ! (Array.isArray(preloads) && preloads.length) ) {
            return;
        }

        for( let preload of preloads ) {
            query.preload(preload.name, builder => {
                builder.auth = query.auth;

                if ( (Array.isArray(preload.columns) && preload.columns.length) ) {
                    builder.select(preload.columns);
                }
                if ( (Array.isArray(preload.preloads) && preload.preloads.length) ) {
                    this.preloadNested(builder, preload.preloads);
                }

            });
        }
    }
}