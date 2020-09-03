/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import { Service } from '@tngraphql/illuminate';
import { BaseRepository } from '../../../../Repositories/Lucid/BaseRepository';
import { MenuItemModel } from '../MenuItemModel';

@Service()
export class MenuItemRepository extends BaseRepository<MenuItemModel, typeof MenuItemModel> {
    model(): typeof MenuItemModel {
        return MenuItemModel;
    }

    async createMany(data) {

    }
}