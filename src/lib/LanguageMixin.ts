/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 9:48 PM
 */
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { LanguageModel } from '../app/Features/Language/LanguageModel';
import { LucidRow } from '@tngraphql/lucid/build/src/Contracts/Model/LucidRow';
import { hasMany } from '@tngraphql/lucid/build/src/Orm/Decorators';

export class LanguageMixin {

    public static bootLanguageMixin() {
        const Model: LucidModel = this as any;

        Model.before('create', async function beforeCreate(model: LucidRow | any, options) {
            if ( model.language ) {
                return model;
            }
            const lang = await LanguageModel.findBy('id', 1);

            model.$setAttribute('language', lang.id);

            return model;
        });

        Model.after('create', async function afterCreate(model: LucidRow | any, options) {
            if ( ! model.languageMaster ) {
                model.languageMaster = model.id;
                await model.save();
            }

            return model;
        });

        Model.before('update', async function beforeUpdate(model: LucidRow | any, options) {
            const [{ seq }] = await Model.query()
                                         .where('language', model.language)
                                         .where('languageMaster', model.languageMaster)
                                         .whereNot('id', model.id)
                                         .count('id as seq');

            if ( seq > 0 ) {
                model.$setAttribute('languageMaster', model.id);
            }

            return model;
        });

        hasMany(() => Model, {
            foreignKey: 'languageMaster',
            localKey: 'languageMaster'
        })(Model.prototype, 'otherLanguages');
    }
}