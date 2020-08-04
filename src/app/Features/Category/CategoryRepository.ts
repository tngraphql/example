/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {Inject, Service, ValidationError} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../Repositories/Lucid/BaseRepository";
import CategoryModel from "./CategoryModel";
import {ModelAttributes} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {CategoryMetaRepository} from "./CategoryMetaRepository";
import {CategoryCreateArgsType} from "./Types/CategoryCreateArgsType";
import {CategoryUpdateArgsType} from "./Types/CategoryUpdateArgsType";

@Service()
export class CategoryRepository extends BaseRepository<CategoryModel> {

    @Inject(type => CategoryMetaRepository)
    protected meta: CategoryMetaRepository

    public model(): typeof CategoryModel {
        return CategoryModel;
    }

    public async create(data: CategoryCreateArgsType): Promise<CategoryModel> {
        return this.transaction(async () => {
            const category = await super.create(data);

            if ( data.meta ) {
                await this.meta.sync(data.meta, category);
            }

            return category;
        })
    }

    public async update(data: CategoryUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<CategoryModel> {
        return this.transaction(async () => {
            const category = await super.update(data, value, attribute);

            if ( data.meta ) {
                await this.meta.sync(data.meta, category);
            }

            return category;
        });
    }

    public async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        const categoryId = typeof id === "string" ? id : id.id;
        let category = typeof id === "string" ? null : id;

        if ( categoryId === '1') {
            throw new Error('Bạn không thể xóa danh mục này.');
        }

        return this.transaction(async () => {
            if (!category) {
                category = await super.newQuery().findBy(attribute, id);
            }

            await super.newQuery()
                .where('parentId', category.id)
                .update({parentId: category.parentId});

            return super.delete(id, attribute);
        });
    }
}
