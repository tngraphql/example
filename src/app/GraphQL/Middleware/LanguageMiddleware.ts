/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import {MiddlewareInterface, NextFn} from "@tngraphql/graphql";
import {LanguageModel} from "../../Features/Language/LanguageModel";

export class LanguageMiddleware implements MiddlewareInterface<{ lang: any }> {
    public async handle({context, info}, next: NextFn, args: any): Promise<any> {
        if (!['Query', 'Mutation'].includes(info.parentType.toString())) {
            return next();
        }

        const language = await LanguageModel.query().where('locale', context.lang.locale).first();
        context.lang.id = language.id;
        context.language = language;

        await next();
    }
}