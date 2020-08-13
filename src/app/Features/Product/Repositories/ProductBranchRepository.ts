/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/6/2020
 * Time: 8:24 PM
 */
import {Inject, InvalidArgumentException, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductMasterModel} from "../Models/ProductMasterModel";
import {ProductBranchModel} from "../Models/ProductBranchModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ProductMasterKindEnumType} from "../Types/Product/ProductMasterKindEnumType";
import Arr from "../../../../lib/Arr";
import {ProductBranchToAttributeRepository} from "./ProductBranchToAttributeRepository";
import {ProductImageRepository} from "./ProductImageRepository";

enum IsMaster {
    master = 2,
    branch = 1
}

@Service()
export class ProductBranchRepository extends BaseRepository<ProductBranchModel> {

    @Inject(type => ProductBranchToAttributeRepository)
    protected productBranchToAttribute: ProductBranchToAttributeRepository;

    @Inject(type => ProductImageRepository)
    protected productImage: ProductImageRepository

    public model(): LucidModel {
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
            const data = Object.assign({}, branch, {
                productMasterId: productMaster.id,
                productVendorId: productMaster.productVendorId,
                productTypeId: productMaster.productTypeId,
                isMaster: branch.isMaster === IsMaster.master ? IsMaster.master : IsMaster.branch,
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
            branchMaster.isMaster = IsMaster.master;

            return Promise.resolve();
        }

        const branchMaster: ProductBranchModel = branches.find(x => x.id === productBranchMaster.id);

        // When productBranch is master, we will set isMaster is true
        if ( branchMaster ) {
            branchMaster.isMaster = IsMaster.master
        };

        // When product is single then should delete all branch not is master
        // And always update to branch master
        if (productMaster.kind !== ProductMasterKindEnumType.single) {
            const branchMaster: ProductBranchModel = Arr.head(branches);
            branchMaster.id = productBranchMaster.id;

            // Detach everything except the branch is master
            await this.newQuery()
                .where('productMasterId', productMaster.id)
                .where('isMaster', IsMaster.branch)
                .delete();
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
            .where('isMaster', IsMaster.master)
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

        //
        await this.productImage.sync(data.images, instance)
        //
        await instance.related('inventory').create({
            ...data.inventory,
            productMasterId: instance.productMasterId
        });

        return instance;
    }
}