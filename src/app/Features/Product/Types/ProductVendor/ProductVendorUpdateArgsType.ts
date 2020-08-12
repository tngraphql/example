/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {ProductVendorModel} from "../../Models/ProductVendorModel";

@ArgsType()
export class ProductVendorUpdateArgsType {
    @Field(returns => ID, {description: 'ID'})
    @Rules([
        'required',
        Rule.exists(ProductVendorModel.getTable(), 'id')
    ])
    public id: string

    @Field({description: 'Tên'})
    @Rules(args => ([
        'filled',
        'between:2,255',
        Rule.unique(ProductVendorModel.getTable(), 'name')
            .ignore(args.id)
    ]))
    public name: string
}