import { ModelQueryBuilderContract } from '@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { BaseRepository } from '../Lucid/BaseRepository';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 9:00 PM
 */

export abstract class Criteria {
    public abstract apply(query: ModelQueryBuilderContract<LucidModel>, repository: BaseRepository);
}