/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 8:36 PM
 */
import { ArgsType, Field } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ProductBranchModel } from '../../Models/ProductBranchModel';
import { InventoryModel } from '../../Models/InventoryModel';

@ArgsType()
export class InventoryArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(InventoryModel.getTable(), 'product_branch_id')
    ], ({ lang }) => ({ 'exists': lang.t('The selected id does not exist or has been deleted.') }))
    public productBranchId: string;

    @Field({ description: 'Số lượng sản phẩm' })
    @Rules(['required',])
    public quantity: number;
}
