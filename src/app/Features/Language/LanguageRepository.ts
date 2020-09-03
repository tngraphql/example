/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import { LanguageModel } from './LanguageModel';
import { BaseRepository } from '../../../Repositories/Lucid/BaseRepository';
import { Inject, Service } from '@tngraphql/illuminate';
import Arr from '../../../lib/Arr';
import _ = require('lodash');
import { OptionRepository } from '../../../Repositories/Lucid/OptionRepository';

@Service()
export class LanguageRepository extends BaseRepository<LanguageModel> {
    @Inject(type => OptionRepository)
    protected option: OptionRepository;

    public model(): typeof LanguageModel {
        return LanguageModel;
    }

    async update(data, value: any, attribute: string = this.getKeyName()): Promise<LanguageModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            if ( data.default ) {
                await this.option.saveSetting({
                    defaultLanguage: instance.id
                });
            }

            return instance;
        })
    }
}
