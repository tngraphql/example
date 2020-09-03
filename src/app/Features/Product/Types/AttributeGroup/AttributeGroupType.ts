/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 9:33 AM
 */
import { Field, ObjectType } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { AttributeGroupModel } from '../../Models/AttributeGroupModel';

@ObjectType('AttributeGroup')
export class AttributeGroupType {
    static model = AttributeGroupModel

    @Field(returns => ID)
    public id: string;

    @Field({ description: 'Tên' })
    public name: string;
}