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
import { ProductMasterModel } from '../../Models/ProductMasterModel';

@ArgsType()
export class ProductMasterFeaturedArgsType {
    @Field(returns => ID)
    @Rules([
        'required',
        Rule.exists(ProductMasterModel.getTable(), 'id')
    ], ({ lang }) => ({ 'exists': lang.t('The selected id does not exist or has been deleted.') }))
    public id: string;

    @Field()
    public isFeatured: boolean;
}
