/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/13/2020
 * Time: 9:31 AM
 */
import {Field, ObjectType} from "@tngraphql/graphql";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {ProductBranchToAttributeModel} from "../../Models/ProductBranchToAttributeModel";
import {AttributeType} from "../Attribute/AttributeType";
import {AttributeGroupType} from "../AttributeGroup/AttributeGroupType";

@ObjectType('ProductAttribute')
export class ProductAttributeType {
    static model = ProductBranchToAttributeModel

    @Field(returns => ID)
    public id: string;

    @Field(returns => ID)
    public attributeGroupId: string;

    @Field(returns => ID)
    public attributeId: string;

    @Field(returns => ID)
    public productBranchId: string;

    @Field(returns => ID)
    public productMasterId: string;

    @Field(returns => AttributeType, {description: 'Các thuộc tính sản phẩm'})
    public attribute: string;

    @Field(returns => AttributeGroupType, {description: 'Các thuộc tính sản phẩm'})
    public attributeGroup: string;
}