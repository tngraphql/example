/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/16/2020
 * Time: 11:19 AM
 */
import { Criteria } from './Criteria';
import { ModelQueryBuilderContract } from '@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { BaseRepository } from '../Lucid/BaseRepository';
import Arr from '../../lib/Arr';

export class LanguageCriteria extends Criteria {
    constructor(protected languageId: any) {
        super();
    }

    public apply(query: ModelQueryBuilderContract<LucidModel>, repository: BaseRepository) {
        query.query('language', this.languageId);
    }
}