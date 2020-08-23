/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */
import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {MenuModel} from "../MenuModel";
import {MenuItemRepository} from "./MenuItemRepository";
import Arr from "../../../../lib/Arr";
import _ = require('lodash');
import {tap} from "../../../../lib/utils";
import {LucidRow} from "@tngraphql/lucid/build/src/Contracts/Model/LucidRow";
import {ConfigOptions} from "../../../../lib/ConfigOptions";
import {OptionRepository} from "../../../../Repositories/Lucid/OptionRepository";
import {Str} from "../../../../lib/Str";

@Service()
export class MenuRepository extends BaseRepository<MenuModel, typeof MenuModel> {
    @Inject(type => MenuItemRepository)
    protected item: MenuItemRepository;

    @Inject(type => OptionRepository)
    protected option: OptionRepository;

    model(): typeof MenuModel {
        return MenuModel;
    }

    async create(data): Promise<MenuModel> {
        return this.transaction(async () => {
            const instance = await super.create(data);

            await instance.related('menuItems').createMany(Arr.wrap(data.menuItems))

            return instance;
        })
    }

    async update(data, value: any, attribute: string = this.getKeyName()): Promise<MenuModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            data.menuItems = Arr.wrap(data.menuItems);

            await this.updateSettings(data, String(instance.language));

            await this.sync(data.menuItems, instance);

            return instance;
        })
    }

    public async updateSettings(args, id) {
        const settings = [
            'headerNavigation',
            'mainNavigation',
            'footerNavigation'
        ];

        for( const i in args ) {
            (settings.includes(i)) && await this.updateSetting(i, args[i], id);
        }
    }

    public async updateSetting(key, value, id) {
        const configs = await ConfigOptions.getOption(key);
        const old = configs['1'];

        // Menu này không thuộc setting cũ và không set vào giá trị mới thì bỏ qua.
        if ( old !== id && ! value ) {
            return;
        }

        configs['1'] = value;

        return this.option.saveSetting({
            [key]: JSON.stringify(configs)
        });
    }

    async sync(menuItems, instance: MenuModel) {
        const items = await this.item.newQuery().where('menuId', instance.id).exec();

        const itemsId = _.map(items, 'id');

        const itemsGroup = _.groupBy(items, x => x.id);

        for( const item of menuItems ) {
            const values = _.pick(item, [
                'id',
                'menuId',
                'title',
                'link',
                'icon',
                'className',
                'target',
                'objectType',
                'objectId',
                'parentId',
                'sort'
            ])

            if (itemsGroup[item.id]) {
                await tap(_.head(itemsGroup[item.id]), async (value: LucidRow) => {
                    value.merge(values);
                    return value.save();
                });
            } else {
                await instance.related('menuItems').create(values);
            }
        }

        await this.item.newQuery().where('menuId', instance.id)
            .whereNotIn('id', _.map(menuItems, 'id'))
            .delete();
    }

    /**
     * Thêm page vào menu. Nếu menu đó cho phép tự động thêm.
     *
     * @param data
     */
    async appendMenu(data): Promise<void> {
        const menus = await this.newQuery().automanticallyMenu(true);

        if ( ! menus ) {
            return;
        }

        for( const menu of menus ) {
            await this.item.create({
                id: Str.uuid(),
                menuId: menu.id,
                title: data.name,
                target: 'self',
                objectType: 'page',
                objectId: data.id,
                parentId: '0',
                sort: 0
            });
        }
    }
}