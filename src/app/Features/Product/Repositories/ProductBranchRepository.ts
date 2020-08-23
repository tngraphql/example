/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 8:24 PM
 */
import {Inject, InvalidArgumentException, Service, ValidationError} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductMasterModel} from "../Models/ProductMasterModel";
import {ProductBranchModel} from "../Models/ProductBranchModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ProductMasterKindEnumType} from "../Types/Product/ProductMasterKindEnumType";
import Arr from "../../../../lib/Arr";
import {ProductBranchToAttributeRepository} from "./ProductBranchToAttributeRepository";
import {ProductImageRepository} from "./ProductImageRepository";
import {ModelQueryBuilderContract} from "@tngraphql/lucid/build/src/Contracts/Model/ModelQueryBuilderContract";
import _ = require('lodash');
import {ProductCreateArgsType} from "../Types/Product/ProductCreateArgsType";
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {ProductMasterRepository} from "./ProductMasterRepository";
import {Str} from "../../../../lib/Str";

@Service()
export class ProductBranchRepository extends BaseRepository<ProductBranchModel, typeof ProductBranchModel> {

    @Inject(type => ProductBranchToAttributeRepository)
    protected productBranchToAttribute: ProductBranchToAttributeRepository;

    @Inject(type => ProductImageRepository)
    protected productImage: ProductImageRepository

    @Inject(type => ProductMasterRepository)
    protected productMaster: ProductMasterRepository

    public model(): typeof ProductBranchModel {
        return ProductBranchModel;
    }

    public async sync(branches, productMaster: ProductMasterModel) {
        if ( ! Array.isArray(branches) ) {
            throw new InvalidArgumentException(`branches must be Array ${branches}`);
        }

        if ( ! productMaster || ! productMaster.id ) {
            throw new InvalidArgumentException(`Unknown productMaster: ${ productMaster }`);
        }

        await this.hydrateProductBranch(branches, productMaster);

        const res = [];

        /**
         * Create or update branch
         */
        for await (const branch of branches) {
            if (productMaster.kind === ProductMasterKindEnumType.single) {
                branch.attributes = [];
            } else if (productMaster.kind === ProductMasterKindEnumType.branch) {
                this.validateBranch(branch);
            }

            const data = Object.assign({}, branch, {
                productMasterId: productMaster.id,
                productVendorId: productMaster.productVendorId,
                productTypeId: productMaster.productTypeId,
                isMaster: branch.isMaster || false,
                fullname: this.getFullName(productMaster.name, branch.attributes)
            });

            if (branch.id) {
                res.push(await this.update(data, branch.id));
            } else {
                res.push(await this.create(data));
            }
        }

        return res;
    }

    protected validateBranch(branch) {
        if (!( Array.isArray(branch.attributes) && branch.attributes.length)) {
            throw new Error('Products type required have attributes.');
        }
    }

    /**
     * Hydrate the branching on the productBranch.
     *
     * @param branches
     * @param productMaster
     */
    protected async hydrateProductBranch(branches, productMaster) {

        // Fetch product branch master
        const productBranchMaster: ProductBranchModel = await this.findMaster(productMaster.id);

        // If not product branch
        if ( ! productBranchMaster ) {
            const branchMaster: ProductBranchModel = Arr.head(branches);
            branchMaster.isMaster = true;

            return Promise.resolve();
        }

        // if product is single always update to branch master
        if (productMaster.kind === ProductMasterKindEnumType.single) {
            const branchMaster: ProductBranchModel = Arr.head(branches);
            branchMaster.id = productBranchMaster.id;
        }

        const branchMaster: ProductBranchModel = branches.find(x => x.id === productBranchMaster.id);

        // When productBranch is master, we will set isMaster is master
        if ( branchMaster ) {
            branchMaster.isMaster = true
        }

        const changeSingleToBranch = !branchMaster
            && !productBranchMaster.attributes.length
            && productMaster.kind === ProductMasterKindEnumType.branch;

        if (changeSingleToBranch) {
            const branchMaster: ProductBranchModel = Arr.head(branches);
            branchMaster.id = productBranchMaster.id;
            branchMaster.isMaster = true
        }
    }

    protected getFullName(name: string, attributes: any[]): string {
        if ( ! Array.isArray(attributes) ) {
            return name;
        }

        attributes = attributes.filter((value, index) => {
            return value && value.name;
        });

        const fullname = [];

        fullname.push(name);

        fullname.push.apply(fullname, attributes.map(x => x.name));

        return fullname.join('-');
    }

    /**
     * Fetch product branch master for relationship
     * @param productMasterId
     */
    public async findMaster(productMasterId: string) {
        return super.newQuery().where('productMasterId', productMasterId)
            .isMaster(true)
            .preload('attributes')
            .first();
    }

    async update(data: any, value: any, attribute: string = this.getKeyName()): Promise<ProductBranchModel> {
        const instance = await super.update(data, value, attribute);

        await this.productBranchToAttribute.sync(data.attributes, instance);

        await this.productImage.sync(data.images, instance);

        await instance.related('inventory').updateOrCreate({
            productBranchId: instance.id
        },{
            ...data.inventory,
            productMasterId: instance.productMasterId
        });

        return instance;
    }

    async create(data: any): Promise<ProductBranchModel> {
        const instance = await super.create(data);

        await this.productBranchToAttribute.sync(data.attributes, instance);

        await this.validateAttribute(data.attributes, instance);

        //
        await this.productImage.sync(data.images, instance)
        //
        await instance.related('inventory').create({
            ...data.inventory,
            productMasterId: instance.productMasterId
        });

        return instance;
    }

    async updateNameAllBranch(productMaster: ProductMasterModel) {
        const branches = await this.newQuery()
            .where('productMasterId', productMaster.id)
            .preload('attributes', query => {
                query.preload('attribute')
                    .preload('attributeGroup')
            })
            .exec();

        for await (const branch of branches) {
            const attrs = branch.attributes.map(x => ({
                name: x.attribute.name,
                groupName: x.attributeGroup.name
            }));
            branch.fullname = this.getFullName(productMaster.name, attrs);

            await branch.save();
        }
    }

    protected async validateAttribute(attributes, productBranch: ProductBranchModel): Promise<void> {

        const existsAttribute = await this.existsAttribute(productBranch);

        if ( existsAttribute ) {
            throw new Error(`The variant '${ existsAttribute.map((x) => (x.attribute.name)).join(' / ') }' already exists. Please change at least one option value.`);
        }
    }

    async existsAttribute(instance: ProductBranchModel) {
        const productBranchId = instance.id;

        let allAttribute: any = await this.productBranchToAttribute.newQuery()
            .where('productMasterId', instance.productMasterId)
            .preload('attribute')
            .exec();

        if ( ! allAttribute || ! allAttribute.length ) {
            return false;
        }

        allAttribute = _.orderBy(allAttribute, ['attributeGroupId']);
        allAttribute = _.groupBy(allAttribute, 'productBranchId');

        const res = allAttribute[productBranchId];

        if ( ! res ) {
            return false;
        }
        const oldValue = allAttribute[productBranchId].map((item) => {
            return _.pick(item.$attributes, ['attributeGroupId', 'attributeId']);
        });

        for( const i in allAttribute ) {
            const newValue = allAttribute[i].map((item) => {
                return _.pick(item.$attributes, ['attributeGroupId', 'attributeId']);
            });

            if ( String(productBranchId) !== i && _.isEqualWith(oldValue, newValue) ) {
                return res;
            }
        }

        return false;
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            let instance: ProductBranchModel;

            if (id instanceof BaseModel) {
                instance = id as any;
            } else {
                const query = this.newQuery();

                instance = await query.where(attribute, id).first();
            }

            if (!instance) {
                return 0;
            }

            await instance.preload('master');

            // master has been deleted
            if (!instance.master) {
                return instance.delete();
            }

            const method: any = 'deleteProduct' + Str.ucFirst(instance.master.kind);

            if (typeof this[method] === "function") {
                return await this[method](instance);
            }

            return instance.delete();
        })
    }

    /**
     * Xóa nhánh sản phẩm của sản phẩm phân nhánh
     * @param instance
     */
    protected async deleteProductBranch(instance: ProductBranchModel) {
        const listMasterBranch: ProductBranchModel[] = await this.newQuery().where('productMasterId', instance.productMasterId)
            .isMaster(false)
            .orderBy('id', 'asc')
            .exec();

        /**
         * Nếu nhánh này là nhánh thường, nên xóa đi.
         */
        if (!instance.isMaster) {
            return instance.delete();
        }

        /**
         * Nếu xóa hết các sản phẩm nhánh trên sản phẩm thì chuyển sản phẩm đó thành sản phẩm đơn
         */
        if ( ! listMasterBranch || ! listMasterBranch.length ) {
            await this.productMaster.update({
                kind: ProductMasterKindEnumType.single
            }, instance.productMasterId);

            return instance.id;
        }

        const masterBranch = _.first(listMasterBranch);

        /**
         * Chuyển cho sản phẩm nhánh tiếp theo làm sản phẩm nhánh chính.
         */
        await super.update({
            isMaster: true
        }, masterBranch.id);

        return instance.delete();
    }

    /**
     * Xóa nhánh sản phẩm của sản phẩm đơn
     *
     * @param instance
     */
    protected async deleteProductSingle(instance) {
        await instance.master.delete();

        return instance.delete();
    }
}