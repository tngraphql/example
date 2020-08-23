/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/23/2020
 * Time: 11:01 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {UserModel} from "../../../UserModel";
import {Timestamp} from "../TimestampScalarType";
import {DateTime} from "luxon";
import {GenderEnumType} from "../GenderEnumType";

@ArgsType()
export class UserProfileArgsType {
    @Field({description: 'Họ và Tên', nullable: false})
    @Rules([
        'filled',
        'between:3,100'
    ])
    public name: string;

    @Field({description: 'Ảnh đại diện'})
    public avatar: string;

    @Field({description: 'số điện thoại'})
    @Rules(async (args, context) => {
        return [
            'between:9,10',
            'regex:/^[0-9]+$/',
            Rule.unique(UserModel.getTable(), 'phone').ignore(await context.auth.id())
        ]
    }, ({lang}) => ({
        'between': lang.t('Phone format is invalid.')
    }))
    public phone: string;

    @Field(returns => Int, {description: 'giới tính: 1-Nam, 2-Nữ', defaultValue: 1})
    @Rules([
        'in:1,2'
    ])
    public gender: GenderEnumType;

    @Field(returns => Timestamp, {description: 'Ngày sinh thần'})
    public dob: DateTime
}
