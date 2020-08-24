/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "./BaseRepository";
import {Inject, Service} from "@tngraphql/illuminate";
import RoleModel from "../../app/Models/RoleModel";
import {OptionRepository} from "./OptionRepository";
import {PermissionRepository} from "./PermissionRepository";
import PermissionModel from "../../app/Models/PermissionModel";
import Arr from "../../lib/Arr";
import _ = require('lodash');
import {BaseModel} from "@tngraphql/lucid/build/src/Orm/BaseModel";
import {ConfigOptions} from "../../lib/ConfigOptions";

@Service()
export class RoleRepository extends BaseRepository<RoleModel> {
    @Inject(type => OptionRepository)
    protected option: OptionRepository;

    public model(): typeof RoleModel {
        return RoleModel;
    }

    async create(data): Promise<RoleModel> {
        return this.transaction(async () => {
            const instance = await super.create(data);

            if (data.isDefault) {
                await this.saveSetting(instance.name)
            }

            const permissions = await PermissionModel.query()
                .whereIn('name', Arr.wrap(data.permissions))
                .exec();

            await instance.related('permissions').sync(_.map(permissions, 'id'));

            return instance;
        });
    }

    async update(data: any, value: any, attribute: string = this.getKeyName()): Promise<RoleModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            if (data.isDefault) {
                await this.saveSetting(instance.name);
            }

            const permissions = await PermissionModel.query()
                .whereIn('name', Arr.wrap(data.permissions))
                .exec();

            await instance.related('permissions').sync(_.map(permissions, 'id'));

            return instance;
        });
    }

    protected saveSetting(name) {
        return this.option.saveSetting({
            defaultRole: name
        });
    }

    async delete(id: any, attribute: string = this.getKeyName()): Promise<number> {
        return this.transaction(async () => {
            let instance: RoleModel;

            if (id instanceof BaseModel) {
                instance = id as RoleModel;
            } else {
                const query = this.newQuery();

                instance = await query.where(attribute, id).first();
            }

            if (!instance) {
                return 0;
            }

            const defaultRole = await ConfigOptions.getOption('defaultRole');

            // Cấm xóa
            if ( ['owner', 'admin', defaultRole].includes(instance.name) ) {
                throw new Error('Bạn không thể xóa nhóm quyền này');
            }

            // Xóa tất cả các user ra khỏi role bị xóa.
            await instance.related('permissions').sync([])

            return instance.delete();
        })
    }
}
