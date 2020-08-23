/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 10:01 AM
 */
import {ArgsType, Field} from "@tngraphql/graphql";

@ArgsType()
export class OptionThemeArgsType {

    @Field({description: 'Meta Head'})
    public metaHeadHTML: string

    @Field({description: 'Meta Head'})
    public metaHeadJSON: string

    @Field({description: 'Meta Footer'})
    public metaFooterHTML: string

    @Field({description: 'Meta Footer'})
    public metaFooterJSON: string

    @Field({description: 'Number phone'})
    public themeNumberPhone: string

    @Field({description: 'facebook message'})
    public themeFacebookMessage: string

    @Field({description: 'zalo message'})
    public themeZaloMessage: string

    @Field({description: 'Theme social',})
    public themeSocials: string

    @Field({description: 'google map code'})
    public googleMap: string

}