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
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {ProductBranchToAttributeModel} from "../Models/ProductBranchToAttributeModel";
import {ProductBranchToAttributeRepository} from "./ProductBranchToAttributeRepository";

@Service()
export class ProductBranchRepository extends BaseRepository<ProductBranchModel> {

    @Inject(type => ProductBranchToAttributeRepository)
    protected productBranchToAttribute: ProductBranchToAttributeRepository

    public model(): LucidModel {
        return ProductBranchModel;
    }

    public async listSync(branches, productMaster: ProductMasterModel) {
        if ( ! Array.isArray(branches) ) {
            throw new InvalidArgumentException(`branches must be Array ${branches}`);
        }

        if ( ! productMaster || ! productMaster.id ) {
            throw new InvalidArgumentException(`Unknown productMaster: ${ productMaster }`);
        }

        let productBranchMaster: ProductBranchModel;

        if ( productMaster.id ) {
            productBranchMaster = await this.findMaster(productMaster.id);
        }

        if (!productBranchMaster) {
            const branchMaster: ProductBranchModel = Arr.head(branches);
            branchMaster.isMaster = true;
        } else {
            const branchMaster: ProductBranchModel = branches.find(x => x.id === productBranchMaster.id);
            branchMaster.isMaster = true;
        }

        const res = [];

        for (const branch of branches) {
            const data = Object.assign({}, branch, {
                productMasterId: productMaster.id,
                productVendorId: productMaster.productVendorId,
                productTypeId: productMaster.productTypeId,
                isMaster: branch.isMaster || false
            });

            if (branch.id) {
                res.push(await this.update(data, branch.id));
            } else {
                res.push(await this.create(data));
            }
        }

        return res;
    }

    public async findMaster(productMasterId: string) {
        return super.newQuery().where('productMasterId', productMasterId)
            .where('isMaster', '2')
            .first();
    }

    async create(data: any): Promise<ProductBranchModel> {
        const instance = await super.create(data);


        await this.productBranchToAttribute.listAsync(data.attributes, instance);

        return instance;
    }
}