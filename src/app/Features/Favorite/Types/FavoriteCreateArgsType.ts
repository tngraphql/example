import { ArgsType, Field } from '@tngraphql/graphql';
import { Rules } from '@tngraphql/illuminate';
import { Rule } from '@tngraphql/illuminate/dist/Foundation/Validate/Rule';
import { FavoriteTypeEnumType } from './FavoriteTypeEnumType';
import FavoriteModel from '../FavoriteModel';
import { ID } from '../../../GraphQL/Types/UidScalerType';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 7:40 PM
 */

@ArgsType()
export class FavoriteCreateArgsType {
    @Field(returns => ID)
    @Rules(args => {
        const rules = [];
        if ( args.favoriteableType === FavoriteTypeEnumType.product ) {
            rules.push(Rule.exists('productMaster', 'id'));
        }

        return [
            'required',
            Rule.unique(FavoriteModel.getTable(), 'favoriteable_id').where('favoriteable_type', args.favoriteableType)
        ];
    }, ({ lang }, args) => {
        switch (args.favoriteableType) {
        case FavoriteTypeEnumType.product:
            return {
                'exists': lang.t('You are trying to favorite a product that doesn\'t exist.'),
            };
            break;

        case FavoriteTypeEnumType.post:
            return {
                'exists': lang.t('You are trying to favorite a post that doesn\'t exist.')
            };
            break;
        case FavoriteTypeEnumType.page:
            return {
                'exists': lang.t('You are trying to favorite a page that doesn\'t exist.')
            };
            break;
        default:
            throw new Error('favorite create cannot handle: ' + args.favoriteableType);
            break;
        }
        return {}
    })
    public favoriteableId: string

    @Field(returns => FavoriteTypeEnumType)
    @Rules([
        'required'
    ])
    public favoriteableType: string;
}