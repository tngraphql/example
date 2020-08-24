import {Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../GraphQL/Types/TimestampScalarType";
import {DateTime} from "luxon";
import {registerPaginateType} from "../../../GraphQL/Types/PaginateType";
import {LanguageModel} from "../LanguageModel";
import {ConfigOptions} from "../../../../lib/ConfigOptions";
import {GraphQLBoolean} from "graphql";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */

@ObjectType('Language')
export class LanguageType {
    static model = LanguageModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên ngôn ngữ '})
    public name: string

    @Field({description: 'Mã ngôn ngữ vi_VN '})
    public locale: string

    @Field({description: 'Mã ngôn ngữ '})
    public code: string

    @Field(returns => Int,{description: 'Viết trừ trái sang phải hoặc ngược lại'})
    public direction: number

    @Field({description: 'Lá cờ'})
    public flag: string

    @Field(returns => Int,{description: 'Vị trí'})
    public position: number

    @Field(returns => GraphQLBoolean, {description: 'Là ngôn ngữ mặc định?'})
    public async default(@Root() parent): Promise<boolean> {
        return String(parent.id) === String(await ConfigOptions.getOption('defaultLanguage'));
    }

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(LanguageType);