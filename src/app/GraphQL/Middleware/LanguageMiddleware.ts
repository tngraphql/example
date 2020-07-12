/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/1/2020
 * Time: 3:34 PM
 */
import {MiddlewareInterface, NextFn} from "@tngraphql/graphql";
import LanguageModel from "../../Models/LanguageModel";

export class LanguageMiddleware implements MiddlewareInterface<{ lang: any }> {
    public async handle({context, info}, next: NextFn, args: any): Promise<any> {
        if (!['Query', 'Mutation'].includes(info.parentType.toString())) {
            return next();
        }

        const language = await LanguageModel.query().where('locale', context.lang.locale);
        context.language = language;

        await next();
    }
}