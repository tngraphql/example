/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:14 PM
 */
import {Args, Ctx, Mutation, Query, Resolver} from "@tngraphql/graphql";
import {BaseResolve} from "./BaseResolve";
import {Inject} from "@tngraphql/illuminate";
import {OptionRepository} from "../../../Repositories/Lucid/OptionRepository";
import {OptionDiscussionType} from "../Types/Option/OptionDiscussionType";
import {OptionsType} from "../Types/Option/OptionsType";
import {OptionDiscussionArgsType} from "../Types/Option/Args/OptionDiscussionArgsType";
import {OptionEmailType} from "../Types/Option/OptionEmailType";
import {OptionEmailArgsType} from "../Types/Option/Args/OptionEmailArgsType";
import {OptionGeneralType} from "../Types/Option/OptionGeneralType";
import {OptionGeneralArgsType} from "../Types/Option/Args/OptionGeneralArgsType";
import {OptionSocialType} from "../Types/Option/OptionSocialType";
import {OptionSocialArgsType} from "../Types/Option/Args/OptionSocialArgsType";
import {OptionThemeType} from "../Types/Option/OptionThemeType";
import {OptionThemeArgsType} from "../Types/Option/Args/OptionThemeArgsType";
import {OptionLanguageType} from "../Types/Option/OptionLanguageType";
import {OptionLanguageArgsType} from "../Types/Option/Args/OptionLanguageArgsType";
import {ConfigOptions} from "../../../lib/ConfigOptions";
import {convertHtmlToJson} from "../../../lib/utils";

const {omit} = require('lodash');

@Resolver()
export class OptionResolve extends BaseResolve {
    @Inject(OptionRepository)
    public repo: OptionRepository;

    @Query(returns => OptionDiscussionType, {description: 'Cài đặt bình luận'})
    async optionDiscussion() {
        return ConfigOptions.getOptions();
    }

    @Query(returns => OptionEmailType, {description: 'Cài đặt email'})
    async optionEmail() {
        if (!await this.auth.check()) {
            return omit(await this.repo.getAllOptions(), 'SMTPPassword');
        }

        return ConfigOptions.getOptions();
    }

    @Query(returns => OptionGeneralType, {description: 'Cài đặt chung'})
    async optionGeneral() {
        return ConfigOptions.getOptions();
    }

    @Query(returns => OptionLanguageType, {description: 'Cài đặt ngôn ngữ'})
    async optionLanguage() {
        return ConfigOptions.getOptions();
    }

    @Query(returns => OptionsType, {description: 'Cài đặt'})
    async options() {
        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionDiscussionType, {
        description: 'Cập nhật cấu hình bình luận.'
    })
    async optionDiscussionUpdate(@Args() args: OptionDiscussionArgsType, @Ctx() context) {
        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionEmailType, {
        description: 'Cập nhật cấu hình SMTP Email'
    })
    async optionEmailUpdate(@Args() args: OptionEmailArgsType, @Ctx() context) {
        if (!args.SMTPPassword) {
            delete args.SMTPPassword;
        }

        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionGeneralType, {
        description: 'Cập nhật cấu hình chung'
    })
    async optionGeneralUpdate(@Args() args: OptionGeneralArgsType, @Ctx() context) {
        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionSocialType, {
        description: 'Cập nhật cấu social'
    })
    async optionSocialUpdate(@Args() args: OptionSocialArgsType, @Ctx() context) {
        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionThemeType, {
        description: 'Cập nhật giao diện website'
    })
    async optionThemeUpdate(@Args() args: OptionThemeArgsType, @Ctx() context) {
        if ( args.metaHeadHTML ) {
            args.metaHeadJSON = JSON.stringify(convertHtmlToJson(args.metaHeadHTML));
        }
        if ( args.metaFooterHTML ) {
            args.metaFooterJSON = JSON.stringify(convertHtmlToJson(args.metaFooterHTML));
        }

        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }

    @Mutation(returns => OptionLanguageType, {description: 'Cập nhật cài đặt ngôn ngữ'})
    async languageConfigUpdate(@Args() args: OptionLanguageArgsType) {
        await this.repo.saveSetting(args);

        return ConfigOptions.getOptions();
    }
}