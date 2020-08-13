/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 9:40 AM
 */
import {Field, Int, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {InventoryModel} from "../../Models/InventoryModel";

@ObjectType('ProductInventory')
export class ProductInventoryType {
    static model = InventoryModel

    @Field(returns => ID)
    public id: string;
    @Field(returns => ID)
    public productBranchId: string;
    @Field(returns => ID)
    public productMasterId: string;

    @Field({description: 'Số lượng tồn kho'})
    public quantity: number;
    @Field(returns => Int, {description: 'Chính sách tồn kho. Cho phép khách hàng mua sản phẩm này khi hết hàng'})
    public inventoryPolicy: number;
    @Field(returns => Int, {description: 'Quản lý tồn kho. Theo dõi tồn kho | không theo dõi tồn kho.'})
    public inventoryManagement: string;
}