import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ProductVendorModel} from "../../Models/ProductVendorModel";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class ProductVendorCreateArgsType {
    @Field({description: 'Tên danh mục'})
    @Rules(args => ([
        'required',
        'between:2,255',
        Rule.unique(ProductVendorModel.getTable(), 'name')
    ]))
    public name: string
}