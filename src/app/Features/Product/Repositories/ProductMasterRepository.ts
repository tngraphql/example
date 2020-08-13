/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 4:01 PM
 */

import {Inject, Service, ValidationError} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ProductMasterModel} from "../Models/ProductMasterModel";
import {ProductCreateArgsType} from "../Types/Product/ProductCreateArgsType";
import {ProductMasterKindEnumType} from "../Types/Product/ProductMasterKindEnumType";
import Arr from "../../../../lib/Arr";
import {TagRepository} from "../../Tag/Repositories/Lucid/TagRepository";
import {ProductMetaRepository} from "./ProductMetaRepository";
import {ProductBranchRepository} from "./ProductBranchRepository";

@Service()
export class ProductMasterRepository extends BaseRepository<ProductMasterModel> {
    @Inject(type => TagRepository)
    protected tag: TagRepository;

    @Inject(type => ProductMetaRepository)
    protected meta: ProductMetaRepository;

    @Inject(type => ProductBranchRepository)
    protected productBranch: ProductBranchRepository;

    public model(): LucidModel {
        return ProductMasterModel;
    }

    public async builderCreate(data: ProductCreateArgsType) {
        data.kind = this.getKind(data);

        data.isFeatured = true;
        data.views = 0;
        data.commentStatus = 'open';
        data.commentCount = 0;

        return this.transaction(async () => {
            switch (data.kind) {
                case ProductMasterKindEnumType.single:
                    return this.builderCreateSingle(data);
                    break;
                case ProductMasterKindEnumType.branch:
                    return this.builderCreateBranch(data);
                    break;
                case ProductMasterKindEnumType.combo:
                    break;
                default:
                    break;
            }
        });
    }

    protected getKind(data: ProductCreateArgsType) {
        if (data.kind) {
            return data.kind;
        }

        for( const branch of data.branches ) {
            if ( Array.isArray(branch.attributes) && branch.attributes.length) {
                return ProductMasterKindEnumType.branch;
            }
        }

        return ProductMasterKindEnumType.single;
    }

    protected async builderCreateBranch(data: ProductCreateArgsType) {
        const instance = await super.create(data);

        const categories = data.categories || ['1'];

        await instance.related('categories').sync(Arr.wrap(categories));

        const tagsName = Arr.wrap(data.tags);

        if ( tagsName.length ) {
            await instance.related('tags').sync(await this.tag.upsert(tagsName));
        }

        await this.meta.sync(data.meta, instance);

        await this.productBranch.sync(data.branches, instance);

        return instance;
    }

    protected async builderCreateSingle(data: ProductCreateArgsType) {
        const instance = await super.create(data);
        if (data.branches.length > 1) {
            throw new ValidationError('???');
        }

        const categories = data.categories || ['1'];

        await instance.related('categories').sync(Arr.wrap(categories));

        const tagsName = Arr.wrap(data.tags);

        if ( tagsName.length ) {
            await instance.related('tags').sync(await this.tag.upsert(tagsName));
        }

        await this.meta.sync(data.meta, instance);

        await this.productBranch.sync(data.branches, instance);

        return instance;
    }

    public async create(data): Promise<ProductMasterModel> {
        return this.transaction(async () => {
            const instance = await super.create(data);


            return instance;
        });
    }

    async update(data: any, value: any, attribute: string = this.getKeyName()): Promise<ProductMasterModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            await instance.related('categories').sync(Arr.wrap(data.categories || []));

            await instance.related('tags').sync(await this.tag.upsert(Arr.wrap(data.tags || [])));

            await this.meta.sync(data.meta, instance);

            await this.productBranch.sync(data.branches, instance);

            return instance;
        });
    }
}