/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/26/2020
 * Time: 8:32 AM
 */
import {BaseRepository} from "./BaseRepository";
import {Service} from "@tngraphql/illuminate";
import OptionModel from "../../app/Models/OptionModel";
import * as _ from 'lodash';
import {ConfigOptions} from "../../lib/ConfigOptions";

@Service()
export class OptionRepository extends BaseRepository<OptionModel> {
    public model(): typeof OptionModel {
        return OptionModel;
    }

    public async saveSetting(data: { [key: string]: any }) {
        return this.transaction(async () => {
            const options = await this.newQuery().whereIn('name', Object.keys(data));
            let names = {};
            if ( options ) {
                names = _.keyBy(options, 'name');
            }

            await Promise.all(_.map(data, (value, name) => {
                if ( ! names[name] ) {
                    return this.create({name, value, autoload: 'yes'});
                }
                return this.model().updateOrCreate({name}, {value});
            }));

            await ConfigOptions.clearCache();

            await ConfigOptions.init();
        });
    }
}
