import {ArgsType, Field} from "@tngraphql/graphql";
import {GraphQLString} from "graphql";
import {Rules, ValidateArgs} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import RoleModel from "../../../Models/RoleModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class RoleCreateArgsType {
    @Field()
    @Rules([
        'required',
        'alpha_dash',
        'max:191',
        Rule.unique(RoleModel.getTable(), 'name')
    ])
    public name: string

    @Field({description: 'Tên hiển thị'})
    @Rules([
        'filled',
        'max:255'
    ])
    public displayName: string

    @Field()
    @Rules([
        'filled',
        'max:255'
    ])
    public description: string

    @Field(returns => [GraphQLString], {description: 'Quyền hạn của role'})
    public permissions: string

    @Field({description: 'Sét nhóm quyền này thành nhóm mặc định.'})
    public isDefault: boolean
}