/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/11/2020
 * Time: 5:37 PM
 */
import {InvalidArgumentException, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ProductImageModel} from "../Models/ProductImageModel";
import {ProductBranchModel} from "../Models/ProductBranchModel";
import _ = require('lodash');

@Service()
export class ProductImageRepository extends BaseRepository<ProductImageModel> {
    model(): typeof ProductImageModel {
        return ProductImageModel;
    }

    async sync(data, instance: ProductBranchModel) {
        if ( _.isObject(data) && ! Array.isArray(data) ) {
            throw new InvalidArgumentException('data must be a Array<{image: string, thumbnailId: string}>');
        }

        if ( ! Array.isArray(data) ) {
            data = [];
        }

        data = data.filter((x) => (x.image));

        data = data.map((image, index) => {
            return {
                productMasterId: instance.productMasterId,
                image: image.image,
                thumbnailId: image.thumbnailId,
                sortOrder: index
            };
        });

        // delete all images of branch
        await this.newQuery().where('productBranchId', instance.id).delete();

        if (!data.length) {
            return;
        }

        // insert all image for branch
        return instance.related('images').createMany(data);
    }
}