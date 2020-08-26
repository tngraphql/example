/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Field, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {OrderItemModel} from "../../Models/OrderItemModel";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {DateTime} from "luxon";

@ObjectType()
export class OrderItemType {
    static model = OrderItemModel

    @Field(returns => ID, {description: 'ID menu item',})
    public id: string

    @Field(returns => ID, {})
    public orderId: string

    @Field(returns => ID, {description: 'ID sản phẩm'})
    public productBranchId: string

    @Field({description: 'Mã sản phẩm'})
    public sku: string

    @Field({description: 'Mã barcode'})
    public code: string

    @Field({description: 'Tên'})
    public name: string

    @Field({description: 'Ảnh đại diện'})
    public image: string

    @Field({description: 'Giá trị'})
    public price: number

    @Field({description: 'Số lượng'})
    public quantity: number

    @Field({description: 'Tổng giá trị'})
    public total: number

    @Field({description: 'Giảm giá'})
    public discount: number

    @Field({description: 'Loại giảm giá'})
    public discountType: number

    @Field({description: 'Thuế'})
    public tax: string

    @Field()
    public reward: string

    @Field({description: 'Kiểu'})
    public type: string

    @Field({description: 'Phần tử'})
    public items: string

    @Field()
    public methodId: string

    @Field()
    public instanceId: string

    @Field()
    public methodType: string

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime
}