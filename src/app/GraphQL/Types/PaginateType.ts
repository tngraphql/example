/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/31/2020
 * Time: 4:41 PM
 */
import {getMetadataStorage} from "@tngraphql/graphql/dist/metadata/getMetadataStorage";
import {Field, Int, ObjectType} from "@tngraphql/graphql";
import {IPaginateType} from "../../../Contracts/IPaginateType";

export function registerPaginateType(target: any): void {
    const type = getMetadataStorage().objectTypes.find(typeDef => typeDef.target === target);

    const pageTypeName = `${type.name}Pagination`;

    @ObjectType(pageTypeName, {description: 'Phân trang'})
    class PageType implements IPaginateType {
        static isPageType = true;

        @Field(returns => Int, {description: 'Số mục bắt đầu'})
        from: number;

        @Field(returns => Int, {description: 'Số mục kết thúc'})
        to: number;

        @Field(returns => Int, {description: 'Số lượng trên trang'})
        perPage: number = 20;

        @Field(returns => Int, {description: 'Trang hiện tại'})
        currentPage: number;

        @Field(returns => Int, {description: 'Tổng số'})
        total: number;

        @Field(returns => [target])
        data: any;
    }
}

export function paginateType<T = any>(target: any): IPaginateType<T> {
    const type = getMetadataStorage().objectTypes.find(typeDef => typeDef.target === target);

    const pageTypeName = `${type.name}Pagination`;

    const page = getMetadataStorage().objectTypes.find(typeDef => typeDef.name === pageTypeName);

    if (page) {
        return page.target as IPaginateType<T>;
    }

    throw new Error(`[${pageTypeName}] can't register.`);
}