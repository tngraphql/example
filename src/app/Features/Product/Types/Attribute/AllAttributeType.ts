/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/24/2020
 * Time: 11:29 AM
 */

import { Field, ObjectType } from '@tngraphql/graphql';
import { ID } from '../../../../GraphQL/Types/UidScalerType';
import { AttributeType } from './AttributeType';
import {AttributeGroupModel} from "../../Models/AttributeGroupModel";

@ObjectType('AllAttribute')
export class AllAttributeType {
    static model = AttributeGroupModel

    @Field(returns => ID)
    public id: string;

    @Field({ description: 'Tên nhóm thuộc tính.' })
    public name: string;

    @Field(returns => [AttributeType], { description: 'Các thuộc tính sản phẩm' })
    public attributes: AttributeType[]
}