/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:43 PM
 */
import { ArgsType, Field, Int } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { ID } from '../../../GraphQL/Types/UidScalerType';
import FavoriteModel from '../FavoriteModel';

@ArgsType()
export class FavoriteDeleteArgsType {
    @Field(returns => [ID])
    @Rules([
        'required',
        Rule.exists(FavoriteModel.getTable(), 'id')
    ], ({ lang }) => ({ 'exists': lang.t('The selected id does not exist or has been deleted.') }))
    public id: number;
}
