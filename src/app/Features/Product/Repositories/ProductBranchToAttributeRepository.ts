/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/11/2020
 * Time: 5:37 PM
 */
import {Inject, InvalidArgumentException, Service, ValidationError} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductBranchToAttributeModel} from "../Models/ProductBranchToAttributeModel";
import {LucidModel} from "@tngraphql/lucid/build/src/Contracts/Model/LucidModel";
import {ProductBranchModel} from "../Models/ProductBranchModel";
import {AttributeGroupRepository} from "./AttributeGroupRepository";
import {AttributeRepository} from "./AttributeRepository";
import _ = require('lodash');
import {Maybe} from "@tngraphql/graphql";

@Service()
export class ProductBranchToAttributeRepository extends BaseRepository<ProductBranchToAttributeModel, typeof ProductBranchToAttributeModel> {
    @Inject(type => AttributeGroupRepository)
    attributeGroup: AttributeGroupRepository;

    @Inject(type => AttributeRepository)
    attribute: AttributeRepository

    model(): LucidModel {
        return ProductBranchToAttributeModel;
    }

    /**
     * Create data ProductBranchToAttribute
     *
     * @param attributes
     * @param instance
     */
    async dataFormat(attributes: any[], instance: ProductBranchModel) {
        return attributes.reduce(async (result, attribute) => {
            result = await result;

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
                    groupName: group.name,
                    name: attr.name,
                    attributeGroupId: group.id,
                    attributeId: attr.id,
                    productMasterId: instance.productMasterId,
                    productBranchId: instance.id
                }
            );

            return result;
        }, []);
    }


    public async sync(attributes, instance: ProductBranchModel) {
        if ( _.isObject(attributes) && ! Array.isArray(attributes) ) {
            throw new InvalidArgumentException('data must be a <{groupName: string;name: string;}>[]');
        }

        // if not attributes then out fn
        if (!attributes) {
            return;
        }

        if (!attributes.length) {
            return this.newQuery().where('productBranchId', instance.id)
                .delete();
        }

        const group = Object.values(_.groupBy(attributes, 'groupName'))
            .find(x => x.length > 1);
        if (group) {
            throw new Error('Attribute group for product be must unique.');
        }

        attributes = attributes.filter((value, index) => {
            return value.groupName && value.name;
        });

        if ( ! Array.isArray(attributes) ) {
            attributes = [];
        }

        let data = await this.dataFormat(attributes, instance);

        const allAttributes = await this.newQuery().where('productMasterId', instance.productMasterId);

        const listAttributeForBranch = allAttributes.filter(x => x.productBranchId === instance.id)

        if (allAttributes.length) {
            const allGroup = [];
            let productBranchId;
            for(const item of allAttributes) {
                if ( ! productBranchId ) {
                    productBranchId = item.productBranchId;
                }

                if ( productBranchId === item.productBranchId ) {
                    allGroup.push(item);
                }
            }

            if ( data.length !== allGroup.length ) {
                throw new Error(`The attribute is invalid`);
            }

            for(const item of data) {
                const index = allGroup.findIndex(x => x.attributeGroupId === item.attributeGroupId);

                if( index === -1 ) {
                    throw new Error(`The attribute group [${item.groupName}] does not exists.`);
                }
            }
        }

        data = data.map(x => _.omit(x, ['name', 'groupName']));

        // if can't find attributes then should create many attributes
        if (! listAttributeForBranch || !listAttributeForBranch.length) {
            return await instance.related('attributes').createMany(data);
        }

        const res = [];

        for await (const item of data) {
            let productBranchToAttribute: Maybe<ProductBranchToAttributeModel> = _.find(listAttributeForBranch, {
                productBranchId: item.productBranchId,
                attributeGroupId: item.attributeGroupId,
                attributeId: item.attributeId
            });

            if (!productBranchToAttribute) {
                productBranchToAttribute = await this.create(item);
            }

            res.push(productBranchToAttribute);
        }

        return res;
    }
}