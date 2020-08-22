/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:04 PM
 */

import {Field, Int, ObjectType} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ID} from "../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../GraphQL/Types/TimestampScalarType";
import {MenuItemModel} from "../MenuItemModel";
import {TargetTypeEnumType} from "./Enum/TargetTypeEnumType";
import {MenuItemTypeEnumType} from "./Enum/MenuItemTypeEnumType";
import {MenuItemObjectType} from "./MenuItemObjectType";
import {MenuType} from "./MenuType";

@ObjectType('MenuItem')
export class MenuItemType {
    static model = MenuItemModel;

    @Field(returns => ID)
    public id: string

    @Field(returns => ID, {description: 'Id menu'})
    public menuId: string

    @Field({description: 'Tiêu để menu item'})
    public title: string

    @Field({description: 'Link của menuitem'})
    public link: string

    @Field({ description: 'Icon menuitem'})
    public icon: string

    @Field({description: 'Tên class trong css'})
    public className: string

    @Field(returns => TargetTypeEnumType)
    public target: string

    @Field({description: 'Đường dẫn ảnh'})
    public image: string

    @Field(returns => MenuItemTypeEnumType, {description: 'Các giá trị type: Category ,Tag, CustomLink '})
    public objectType: string

    @Field(returns => ID, {description: 'Object theo type '})
    public objectId: string

    @Field(returns => MenuItemObjectType, {description: 'Object theo type'})
    public objectItem: MenuItemObjectType

    @Field(returns => ID, {description: 'Id menuitem cha '})
    public parentId: string

    @Field(returns => Int)
    public sort: number

    @Field(returns => MenuType, {description: 'Thông tin menu '})
    public menu: MenuType

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}