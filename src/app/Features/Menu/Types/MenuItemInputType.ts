/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/16/2020
 * Time: 9:13 AM
 */
import {Field, InputType, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {TargetTypeEnumType} from "./Enum/TargetTypeEnumType";
import {MenuItemTypeEnumType} from "./Enum/MenuItemTypeEnumType";
import {ID} from "../../../GraphQL/Types/UidScalerType";

@InputType('MenuItemInput')
export class MenuItemInputType {
    @Field(returns => ID, {description: 'ID menu item'})
    @Rules(['required'])
    public id: string;

    @Field({description: 'Tên menu'})
    public title: string;

    @Field({description: 'Liên kết'})
    public link: string;

    @Field({description: 'Icon'})
    public icon: string;

    @Field({description: 'CSS class'})
    public className: string;

    @Field(returns => TargetTypeEnumType, {description: 'Target'})
    public target: TargetTypeEnumType;

    @Field(returns => MenuItemTypeEnumType, {description: 'Loại menu'})
    @Rules(['required'])
    public objectType: MenuItemTypeEnumType;

    @Field(returns => ID, {description: 'ID liên kết'})
    public objectId: string;

    @Field(returns => ID, {description: 'ID menu cha'})
    public parentId: string;

    @Field(returns => Int, {description: 'Thứ tự.'})
    public sort: number;
}