/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { ProductBranchModel } from '../../Models/ProductBranchModel';

@ArgsType()
export class ProductBranchDeleteArgsType {
    @Field(returns => [ID])
    @Rules([
        'required',
        Rule.exists(ProductBranchModel.getTable(), 'id')
    ], ({ lang }) => ({ 'exists': lang.t('The selected id does not exist or has been deleted.') }))
    public id: number;
}
