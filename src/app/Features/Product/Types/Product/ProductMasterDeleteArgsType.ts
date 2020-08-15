/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 AM
 */
import {ArgsType, Field, Int} from "@tngraphql/graphql";
import {Rules} from "@tngraphql/illuminate";
import {Rule} from "@tngraphql/illuminate/dist/Foundation/Validate/Rule";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {ProductMasterModel} from "../../Models/ProductMasterModel";

@ArgsType()
export class ProductMasterDeleteArgsType {
    @Field(returns => [ID])
    @Rules([
        'required',
        Rule.exists(ProductMasterModel.getTable(), 'id')
    ], ({lang}) => ({'exists': lang.t('The selected id does not exist or has been deleted.')}))
    public id: number;
}
