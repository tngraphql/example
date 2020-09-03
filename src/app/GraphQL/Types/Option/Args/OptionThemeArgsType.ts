/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 10:01 AM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { GraphQLString } from 'graphql';

@ArgsType()
export class OptionThemeArgsType {

    @Field(returns => GraphQLString, { description: 'Meta Head' })
    public metaHeadHTML: string;

    public getMetaHeadHTML(value): string {
        if ( ! value ) {
            return value;
        }
        return value.trim();
    }

    @Field({ description: 'Meta Head' })
    public metaHeadJSON: string;

    @Field(returns => GraphQLString, { description: 'Meta Footer' })
    public metaFooterHTML: string;

    public getMetaFooterHTML(value): string {
        if ( ! value ) {
            return value;
        }
        return value.trim();
    }

    @Field({ description: 'Meta Footer' })
    public metaFooterJSON: string

    @Field({ description: 'Number phone' })
    public themeNumberPhone: string

    @Field({ description: 'facebook message' })
    public themeFacebookMessage: string

    @Field({ description: 'zalo message' })
    public themeZaloMessage: string

    @Field({ description: 'Theme social', })
    public themeSocials: string

    @Field({ description: 'google map code' })
    public googleMap: string

}