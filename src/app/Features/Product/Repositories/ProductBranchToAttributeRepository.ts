/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/11/2020
 * Time: 5:37 PM
 */
import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductBranchToAttributeModel} from "../Models/ProductBranchToAttributeModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ProductBranchModel} from "../Models/ProductBranchModel";
import {AttributeGroupRepository} from "./AttributeGroupRepository";
import {AttributeRepository} from "./AttributeRepository";

@Service()
export class ProductBranchToAttributeRepository extends BaseRepository<ProductBranchToAttributeModel> {
    @Inject(type => AttributeGroupRepository)
    attributeGroup: AttributeGroupRepository;

    @Inject(type => AttributeRepository)
    attribute: AttributeRepository

    model(): LucidModel {
        return ProductBranchToAttributeModel;
    }

    async dataFormat(attributes: any[], instance: ProductBranchModel) {
        return attributes.reduce(async (result, attribute) => {
            if ( ! attribute.groupName || ! attribute.name ) {
                return result;
            }

            const group = await this.attributeGroup.firstOrCreate({name: attribute.groupName}, {name: attribute.groupName});

            const attr = await this.attribute.firstOrCreate({
                attributeGroupId: group.id,
                name: attribute.name
            }, {
                name: attribute.name
            });

            result.push(
                {
                    attributeGroupId: group.id,
                    attributeId: attr.id,
                    productBranchId: instance.id,
                    productMasterId: instance.productMasterId
                }
            );

            return result;
        }, []);
    }


    public async listAsync(attributes, instance: ProductBranchModel) {
        attributes = attributes.filter((value, index) => {
            return value.groupName && value.name;
        });

        if ( ! Array.isArray(attributes) ) {
            attributes = [];
        }



        await instance.related('attributes').createMany(attributes);
    }
}