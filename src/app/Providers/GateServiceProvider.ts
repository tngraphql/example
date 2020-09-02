/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 3/30/2020
 * Time: 8:43 AM
 */
import {Service, ServiceProvider} from "@tngraphql/illuminate";
import {Gate, Guard} from "@slynova/fence";
import {PostModel} from "../Features/Post/PostModel";
import {UserModel} from "../UserModel";

Guard.prototype['any'] = function (any) {
    if (!Array.isArray(any)) {
        any = [any];
    }

    return any.some(ability => {
        return this.allows(ability);
    })
}

Guard.prototype['none'] = function none(any) {
    if (!Array.isArray(any)) {
        any = [any];
    }

    return any.filter(ability => {
        return this.allows(ability);
    }).length === any.length;
}

@Service()
export class GateServiceProvider extends ServiceProvider {

    register(): void {
        Gate.define('viewUser', (user: any) => {
            return user.attributes.scopes.includes('viewUser');
        });

        require(this.app.basePath('start/gate'))
    }
}
