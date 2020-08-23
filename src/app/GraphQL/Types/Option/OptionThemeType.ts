/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 10:01 AM
 */
import {Field, Int, InterfaceType, ObjectType, Root} from "@tngraphql/graphql";
import {JSONType} from "../ScalarType/JsonScalerType";

@ObjectType('OptionTheme')
@InterfaceType()
export class OptionThemeType {

    @Field({description: 'Meta Head'})
    public metaHeadHTML: string

    @Field(returns => JSONType, {description: 'Meta Head'})
    public metaHeadJSON: any

    @Field({description: 'Meta Footer'})
    public metaFooterHTML: string

    @Field(returns => JSONType, {description: 'Meta Footer'})
    public metaFooterJSON: string

    @Field({description: 'Number phone'})
    public themeNumberPhone: string

    @Field({description: 'facebook message'})
    public themeFacebookMessage: string

    @Field({description: 'zalo message'})
    public themeZaloMessage: string

    @Field(returns => JSONType,{description: 'Theme social',})
    public themeSocials(@Root() parent) {
        if ( ! parent.themeSocials ) {
            return {};
        }
        return parent.themeSocials;
    }

    @Field({description: 'google map code'})
    public googleMap: string

}