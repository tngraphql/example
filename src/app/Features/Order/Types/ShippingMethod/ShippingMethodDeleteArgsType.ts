/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/26/2020
 * Time: 11:33 AM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { ShippingMethodModel } from '../../Models/ShippingMethodModel';

@ArgsType()
export class ShippingMethodDeleteArgsType {
    @Field(returns => [ID])
    @Rules([
        'required',
        Rule.exists(ShippingMethodModel.getTable(), 'id')
    ], ({ lang }) => ({ 'exists': lang.t('The selected id does not exist or has been deleted.') }))
    public id: number;
}
