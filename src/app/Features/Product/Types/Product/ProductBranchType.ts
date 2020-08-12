/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 4:54 PM
 */
import {Arg, Ctx, Field, Int, ObjectType, Root} from "@tngraphql/graphql";
import {DateTime} from "luxon";
import {ID} from "../../../../GraphQL/Types/UidScalerType";
import {TimestampScalarType} from "../../../../GraphQL/Types/TimestampScalarType";
import {registerPaginateType} from "../../../../GraphQL/Types/PaginateType";
import {ProductBranchModel} from "../../Models/ProductBranchModel";

@ObjectType('ProductBranch')
export class ProductBranchType {
    static model = ProductBranchModel

    @Field(returns => ID)
    public id: string

    @Field({description: 'Tên sản phẩm'})
    public name: string;

    @Field(returns => TimestampScalarType)
    public createdAt: DateTime

    @Field(returns => TimestampScalarType)
    public updatedAt: DateTime

    @Field(returns => TimestampScalarType)
    public deletedAt: DateTime
}

registerPaginateType(ProductBranchType);