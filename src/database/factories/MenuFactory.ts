/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 6/10/2020
 * Time: 3:12 PM
 */

import { Factory } from '@tngraphql/illuminate/dist/Support/Facades';
import {MenuStatusEnumType} from "../../app/Features/Menu/Types/Enum/MenuStatusEnumType";

Factory.blueprint('App/Features/Menu/MenuModel', (faker, index, data) => {
    return {
        name: data.name || faker.name(),
        // alias: '',
        // slug: '',
        status: data.status || MenuStatusEnumType.publish,
        description:  data.description || faker.name(),
        automanticallyMenu: data.automanticallyMenu || true,
    }
});