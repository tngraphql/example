/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:44 AM
 */

import {ObjectType} from "@tngraphql/graphql";
import {OptionDiscussionType} from "./OptionDiscussionType";
import {OptionGeneralType} from "./OptionGeneralType";
import {OptionLanguageType} from "./OptionLanguageType";
import {OptionSocialType} from "./OptionSocialType";
import {OptionEmailType} from "./OptionEmailType";

@ObjectType({
    implements: [
        OptionDiscussionType,
        OptionGeneralType,
        OptionLanguageType,
        OptionSocialType,
        OptionEmailType,
    ]
})
export class OptionsType {
}