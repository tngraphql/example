import { Field, ObjectType } from '@tngraphql/graphql';
import { ID } from './UidScalerType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/13/2020
 * Time: 9:35 PM
 */

@ObjectType('OtherLanguage')
export class OtherLanguageType {
    @Field(returns => ID)
    public id: string

    @Field(returns => ID, { description: 'ID ngôn ngữ ' })
    public language: string;

    @Field(returns => ID, { description: 'ID ngôn ngữ được tạo ra đầu tiên' })
    public languageMaster: string;
}