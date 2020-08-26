/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 8/15/2020
 * Time: 10:42 PM
 */

import {Inject, Service} from "@tngraphql/illuminate";
import {BaseRepository} from "../../../../Repositories/Lucid/BaseRepository";
import {ShippingZoneModel} from "../Models/ShippingZoneModel";
import {ShippingZoneUpdateArgsType} from "../Types/ShippingZone/ShippingZoneUpdateArgsType";
import {ShippingLocationRepository} from "./ShippingLocationRepository";

@Service()
export class ShippingZoneRepository extends BaseRepository<ShippingZoneModel, typeof ShippingZoneModel>  {
    @Inject(type => ShippingLocationRepository)
    protected shippingLocation: ShippingLocationRepository

    model(): typeof ShippingZoneModel {
        return ShippingZoneModel;
    }

    async create(data): Promise<ShippingZoneModel> {
        return this.transaction(async () => {
            const zoneOrder = await this.query()
                .orderBy('zoneOrder', 'desc')
                .first();

            data.zoneOrder = 1;

            if ( zoneOrder ) {
                data.zoneOrder = zoneOrder.zoneOrder + 1;
            }

            const zone = await super.create(data);

            if ( Array.isArray(data.country) ) {
                const country = data.country.map((x) => {
                    return {
                        zoneId: zone.id,
                        code: x,
                        type: 'country'
                    };
                });

                await zone.related('location').createMany(country);
            }

            if ( Array.isArray(data.postcode) ) {
                const country = data.postcode.map((x) => {
                    return {
                        zoneId: zone.id,
                        code: x,
                        type: 'country'
                    };
                });

                await zone.related('location').createMany(country);
            }

            return zone;
        })
    }

    async update(data: ShippingZoneUpdateArgsType, value: any, attribute: string = this.getKeyName()): Promise<ShippingZoneModel> {
        return this.transaction(async () => {
            const instance = await super.update(data, value, attribute);

            await this.shippingLocation.delete(instance.id, 'zoneId');

            if ( Array.isArray(data.country) ) {
                const country = data.country.map((x) => {
                    return {
                        zoneId: instance.id,
                        code: x,
                        type: 'country'
                    };
                });

                await instance.related('location').createMany(country);
            }

            if ( Array.isArray(data.postcode) ) {
                const country = data.postcode.map((x) => {
                    return {
                        zoneId: instance.id,
                        code: x,
                        type: 'country'
                    };
                });

                await instance.related('location').createMany(country);
            }

            return instance;
        });
    }
}