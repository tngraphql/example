/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import {MiddlewareInterface, NextFn} from "@tngraphql/graphql";
import {LanguageModel} from "../../Features/Language/LanguageModel";
import {ConfigOptions} from "../../../lib/ConfigOptions";

export class LanguageMiddleware implements MiddlewareInterface<{ lang: any }> {
    public async handle({context, info}, next: NextFn, args: any): Promise<any> {
        if (!['Query', 'Mutation'].includes(info.parentType.toString())) {
            return next();
        }

        const locale = context?.req?.headers?.locale;

        let language;

        if ( ! locale ) {
            const defaultLanguage = await ConfigOptions.getOption('defaultLanguage');

            language = await LanguageModel.query().where('id', defaultLanguage).first();

        } else {
            language = await LanguageModel.query().where('locale', locale).first();
        }

        if (!language) {
            language = await LanguageModel.query().first();
        }

        context.lang.id = language.id;
        context.language = language;

        context.app.setLocale(language.locale)

        return next();
    }
}