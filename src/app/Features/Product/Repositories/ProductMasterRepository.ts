/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/4/2020
 * Time: 4:01 PM
 */

import { Inject, Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { LucidModel } from '@tngraphql/lucid/build/src/Contracts/Model/LucidModel';
import { ProductMasterModel } from '../Models/ProductMasterModel';
import { ProductCreateArgsType } from '../Types/Product/ProductCreateArgsType';
import { ProductMasterKindEnumType } from '../Types/Product/ProductMasterKindEnumType';
import Arr from '../../../../lib/Arr';
import { TagRepository } from '../../Tag/Repositories/Lucid/TagRepository';
import { ProductMetaRepository } from './ProductMetaRepository';
import { ProductBranchRepository } from './ProductBranchRepository';
import { ProductBranchToAttributeRepository } from './ProductBranchToAttributeRepository';
import { ProductUpdateArgsType } from '../Types/Product/ProductUpdateArgsType';
import { BaseModel } from '@tngraphql/lucid/build/src/Orm/BaseModel';
import { Str } from '../../../../lib/Str';
import { ResolveAuth } from '../../../../decorators/ResolveAuth';
import { RequestGuard } from '@tngraphql/auth/dist/src/Guards/RequestGuard';
import { ValidationException } from '@tngraphql/illuminate/dist/Foundation/Validate/ValidationException';

@Service()
export class ProductMasterRepository extends BaseRepository<ProductMasterModel, typeof ProductMasterModel> {
    @Inject(type => TagRepository)
    protected tag: TagRepository;

    @Inject(type => ProductMetaRepository)
    protected meta: ProductMetaRepository;

    @Inject(type => ProductBranchRepository)
    protected productBranch: ProductBranchRepository;

    @Inject(type => ProductBranchToAttributeRepository)
    protected productBranchToAttribute: ProductBranchToAttributeRepository;

    @ResolveAuth()
    public auth: RequestGuard

    public model(): typeof ProductMasterModel {
        return ProductMasterModel;
    }

    public async builderCreate(data: ProductCreateArgsType): Promise<ProductMasterModel> {
        data.kind = this.getKind(data);

        data.isFeatured = false;
        data.views = 0;
        data.commentStatus = 'open';
        data.commentCount = 0;

        const method = 'builderCreate' + Str.ucFirst(data.kind);

        if ( typeof this[method] !== 'function' ) {
            throw ValidationException.withMessages({
                'kind': 'product create cannot handle: ' + data.kind
            });
            // throw new Error('product create cannot handle: ' + data.kind);
        }

        return this.transaction(async () => {
            return this[method](data);
        });
    }

    protected getKind(data: ProductCreateArgsType) {
        if ( data.kind ) {
            return data.kind;
        }

        for( const branch of data.branches ) {
            if ( Array.isArray(branch.attributes) && branch.attributes.length ) {
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
        if ( data.branches.length > 1 ) {
            throw new Error('???');
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

    async update(data: ProductUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<ProductMasterModel> {
        return this.transaction(async () => {
            const query = this.newQuery();
            const instance = await query.where(attribute, '=', value).firstOrFail();
            instance.merge(data);

            await instance.related('categories').sync(Arr.wrap(data.categories || []));

            await instance.related('tags').sync(await this.tag.upsert(Arr.wrap(data.tags || [])));

            await this.meta.sync(data.meta, instance);

            if ( data.branches && data.branches.length ) {
                await this.productBranch.sync(data.branches, instance);
            }

            await this.convertKind(instance, data);

            await this.productBranch.updateNameAllBranch(instance);

            await instance.save();

            return instance;
        });
    }

    /**
     * update muiltiple branch to single product.
     *
     * @param instance
     */
    protected async convertKind(instance, data) {
        const changes = instance.$dirty;

        if ( ! changes.kind ) {
            return Promise.resolve();
        }

        switch (instance.kind) {
            /**
             * IF change to product single
             */
        case ProductMasterKindEnumType.single:
            // Detach everything except the branch is master
            await this.productBranch.newQuery()
                      .where('productMasterId', instance.id)
                      .isMaster(false)
                      .delete();

            // Detach all attributes
            await this.productBranchToAttribute.newQuery()
                      .where('productMasterId', instance.id)
                      .delete();
            break;

        case ProductMasterKindEnumType.branch:
            if ( ! (data.branches && data.branches.length) ) {
                throw new Error('Products type required have attributes.')
            }
            break;
        }
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            let instance;

            if ( id instanceof BaseModel ) {
                instance = id;
            } else {
                const query = this.newQuery();

                instance = await query.where(attribute, id).first();
            }

            if ( ! instance ) {
                return 0;
            }

            await instance.delete();

            await this.productBranch.destroy([instance.id], 'productMasterId');

            return instance;
        })
    }

    /**
     * Thay đổi sản phẩm nổi bật.
     *
     * @param featured
     * @param id
     */
    public async changeFeatured(featured: boolean, id: string) {
        return super.update({
            isFeatured: featured
        }, id);
    }
}