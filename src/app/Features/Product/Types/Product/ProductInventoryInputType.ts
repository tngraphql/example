/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 7:50 PM
 */
import { Field, InputType } from '@tngraphql/graphql';
import { GraphQLInt } from 'graphql';

@InputType('ProductInventoryInput')
export class ProductInventoryInputType {
    @Field({ description: 'Số lượng tồn kho', defaultValue: '0' })
    public quantity: number;

    @Field(returns => GraphQLInt, { description: 'Chính sách tồn kho' })
    public inventoryPolicy?: number

    @Field(returns => GraphQLInt, { description: 'Quản lý số lượng tồn kho' })
    public inventoryManagement?: number

}