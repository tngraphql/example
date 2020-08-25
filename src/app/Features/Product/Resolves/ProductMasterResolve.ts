/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/11/2020
 * Time: 5:53 PM
 */
import {Arg, Args, Ctx, Mutation, Query, Resolver, UseMiddleware} from "@tngraphql/graphql";
import {BaseResolve} from "../../../GraphQL/Resolves/BaseResolve";
import {Inject, ValidateArgs} from "@tngraphql/illuminate";
import {SelectFields} from "../../../../decorators/SelectFields";
import {SortByCriteria} from "../../../../Repositories/Criteria/SortByCriteria";
import {FilterCriteria} from "../../../../Repositories/Criteria/FilterCriteria";
import {SelectionCriteria} from "../../../../Repositories/Criteria/SelectionCriteria";
import {paginateType} from "../../../GraphQL/Types/PaginateType";
import {DeleteType} from "../../../GraphQL/Types/DeleteType";
import {Resource} from "../../../../lib/Resource";
import {ProductMasterRepository} from "../Repositories/ProductMasterRepository";
import {ProductMasterType} from "../Types/Product/ProductMasterType";
import {ProductCreateArgsType} from "../Types/Product/ProductCreateArgsType";
import {ProductUpdateArgsType} from "../Types/Product/ProductUpdateArgsType";
import {ProductMasterIndexArgsType} from "../Types/Product/ProductMasterIndexArgsType";
import {ProductMasterListArgsType} from "../Types/Product/ProductMasterListArgsType";
import {ProductMasterDeleteArgsType} from "../Types/Product/ProductMasterDeleteArgsType";
import {ProductMasterFeaturedArgsType} from "../Types/Product/ProductMasterFeaturedArgsType";
import {AllAttributeType} from "../Types/Attribute/AllAttributeType";
import {ISelection} from "../../../../Contracts/SelectionCriteriaContract";
import _ = require('lodash');
import {ID} from "../../../GraphQL/Types/UidScalerType";

@Resolver()
export class ProductMasterResolve extends BaseResolve {
    @Inject(ProductMasterRepository)
    public repo: ProductMasterRepository;

    @Query(returns => ProductMasterType, {
        description: 'Chi tiết sản phẩm'
    })
    async index(@Args() args: ProductMasterIndexArgsType, @SelectFields() fields) {
        const query = this.repo.query();
        query._query.auth = await this.auth.user();

        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.first();
    }

    @Query(returns => paginateType(ProductMasterType))
    async productMasterList(@Args() args: ProductMasterListArgsType, @SelectFields() fields, @Ctx() context) {
        const query = this.repo.query();
        query._query.auth = await this.auth.user();

        query.pushCriteria(new SortByCriteria(args.order));
        query.pushCriteria(new FilterCriteria(args.filter));
        query.pushCriteria(new SelectionCriteria(fields));

        return query.paginate(args.limit, args.page);
    }

    @Mutation(returns => ProductMasterType, {description: 'Tạo mới tài khoản'})
    @ValidateArgs(ProductCreateArgsType)
    @UseMiddleware('auth')
    async create(@Args() args: ProductCreateArgsType, @SelectFields() fields) {
        const created = await this.repo.builderCreate(args as any);
        const query = this.repo.query();
        query._query.auth = await this.auth.user();

        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(created.id);
    }

    @Mutation(returns => ProductMasterType)
    @ValidateArgs(ProductUpdateArgsType)
    @UseMiddleware('auth')
    async update(@Args() args: ProductUpdateArgsType, @SelectFields() fields) {
        const category = await this.repo.update(args as any, args.id);
        const query = this.repo.query();
        query._query.auth = await this.auth.user();

        query.pushCriteria(new SelectionCriteria(fields));
        return query.firstBy(category.id);
    }

    @Mutation(returns => DeleteType)
    @ValidateArgs(ProductMasterDeleteArgsType)
    @UseMiddleware('auth')
    async delete(@Args() args: ProductMasterDeleteArgsType, @Ctx() ctx) {
        return Resource.delete(await this.repo.destroy(args.id), ctx.lang);
    }

    /**
     * Thay đổi sản phẩm nổi bật
     */
    @Mutation(returns => ProductMasterType, {description: 'Thay đổi sản phẩm nổi bật'})
    @ValidateArgs(ProductMasterFeaturedArgsType)
    // @UseMiddleware('auth')
    async productChangeFeature(@Args() args: ProductMasterFeaturedArgsType, @SelectFields() fields) {
        await this.repo.changeFeatured(args.isFeatured, args.id);

        const query = this.repo.query();
        query._query.auth = await this.auth.user();

        return query
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(args.id);
    }


    @Query(returns => [AllAttributeType], {description: 'Tất cả attribute của sản phẩm.'})
    async productAllAttribute(
        @Arg('productMasterId', returns => ID) productMasterId: string
    ) {

        const fields: ISelection = {
            columns: ['id', 'name'],
            preloads: [
                {
                    name: 'allAttribute',
                    columns: ['attributeGroupId', 'attributeId'],
                    preloads: [
                        {
                            name: 'attribute',
                            columns: ['id', 'name']
                        },
                        {
                            name: 'attributeGroup',
                            columns: ['id', 'name']
                        }
                    ]
                }
            ]
        }

        const parent = await this.repo.query()
            .pushCriteria(new SelectionCriteria(fields))
            .firstBy(productMasterId)
            .then(x => x.toJSON());

        if ( ! parent ) {
            return null;
        }

        if (!Array.isArray(parent.allAttribute) || !parent.allAttribute.length) {
            return null;
        }

        const uniq = _.uniqBy(parent.allAttribute, 'attribute.name');

        const data = _.groupBy(uniq, 'attributeGroup.name');

        const res = [];
        for( const i in data ) {
            if ( ! data[i].length ) {
                continue;
            }

            const element = {
                ...data[i][0].attributeGroup,
                attributes: data[i].map((item) => (item.attribute))
            };
            res.push(element);
        }

        return res;
    }
}
