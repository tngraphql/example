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
        if (!['Query', 'Mutation', 'Subscription'].includes(info.parentType.toString())) {
            return next();
        }

        if (!context.req) {
            return next();
        }

        if (context.req.language) {
            return next();
        }

        if (!context.req.promiseLanguage) {
            context.req.promiseLanguage = this.getLanguage(context.req.headers?.locale);
        }

        let language = await context.req.promiseLanguage;
        context.req.promiseLanguage = null;

        if (!language) {
            return next();
        }

        context.lang.id = language.id;

        context.req.language = context.language = language;

        context.lang.setLocale(language.locale);

        return next();
    }

    protected async getLanguage(locale?) {
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

        return language;
    }
}