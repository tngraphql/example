/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 9:44 AM
 */

import {Field, ObjectType, Root} from "@tngraphql/graphql";
import {OptionDiscussionType} from "./OptionDiscussionType";
import {OptionGeneralType} from "./OptionGeneralType";
import {OptionLanguageType} from "./OptionLanguageType";
import {OptionSocialType} from "./OptionSocialType";
import {OptionEmailType} from "./OptionEmailType";
import {GraphQLBoolean} from "graphql";

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
    // OptionDiscussionType
    @Field()
    public defaultCommentStatus(@Root() parent): boolean {
        return !! Number(parent.defaultCommentStatus);
    }

    @Field({description: 'Yêu cầu phải kiểm duyệt trước khi đăng bình luận.',})
    public commentModeration(@Root() parent): boolean {
        return !! Number(parent.commentModeration);
    }

    // OptionGeneralType
    @Field({description: 'Có được phép đăng ký thành viên',})
    public usersCanRegister(@Root() parent): boolean {
        return !! Number(parent.usersCanRegister);
    }

    // OptionSocialType
    @Field({description: 'Configure social login options',})
    public socialLogin(@Root() parent): boolean {
        return !! parent.socialLogin;
    }

    @Field({description: 'Enable/disable & configure app credentials for Facebook login',})
    public facebookLoginEnable(@Root() parent): boolean {
        return !! parent.facebookLoginEnable;
    }

    @Field({description: 'Enable/disable & configure app credentials for Google login',})
    public googleLoginEnable(@Root() parent): boolean {
        return !! parent.googleLoginEnable;
    }

    @Field({description: 'Enable/disable & configure app credentials for Github login',})
    public githubLoginEnable(@Root() parent): boolean {
        return !! parent.githubLoginEnable;
    }

    @Field({description: 'Auto-register users?',})
    public autoRegister(@Root() parent): boolean {
        return !! parent.autoRegister;
    }

    // language
    @Field({ description: 'Ẩn ngôn ngữ mặc định khỏi url'})
    public hideDefaultLanguage(@Root() parent): boolean {
        return !! Number(parent.hideDefaultLanguage);
    }

    @Field({description: 'Show ra ngôn ngữ mặc định nếu nó không tồn tại trong ngôn ngữ hiện tại.'})
    public showItemDefaultLanguage(@Root() parent): boolean {
        return !! Number(parent.showItemDefaultLanguage);
    }

    // Email
    @Field({description: 'password'})
    public SMTPPassword(): string {
        return null;
    }
}