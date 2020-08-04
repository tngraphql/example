/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/26/2020
 * Time: 5:40 PM
 */
import {InMemoryLRUCache, PrefixingKeyValueCache} from 'apollo-server-caching';
import {Database} from "@tngraphql/illuminate/dist/Support/Facades";

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export class ConfigOptions {
    public static cache: PrefixingKeyValueCache = new PrefixingKeyValueCache(new InMemoryLRUCache(), 'options');

    public static key = 'ConfigOptions';

    public static setCacheControl(cache: PrefixingKeyValueCache) {
        this.cache = cache;
    }

    public static async clearCache() {
        await this.cache.delete(this.key);
    }

    static async getAllOptions() {
        const data = await Database.from('options');

        return data.reduce((result, currentValue) => {
            result[currentValue.name] = currentValue.value;
            return result;
        }, {});
    }

    public static async init(): Promise<void> {

        const old = await this.getOptions();
        if ( ! old ) {
            const data = await this.getAllOptions();

            for( const i in data ) {
                const value = data[i];

                data[i] = isJson(value) ? JSON.parse(value) : value;
            }

            await this.cache.set(this.key, JSON.stringify(data), { ttl: 99999 });
        }
    }

    public static async getOptions() {
        let data: string = await this.cache.get(this.key);

        if ( data ) {
            data = JSON.parse(data);
        }

        return data;
    }

    public static async getOption(key) {
        let value = await this.getOptions() || null;
        if ( value ) {
            value = value[key];
        }

        return value;
    }
}