/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 3/30/2020
 * Time: 8:43 AM
 */
import { Service, ServiceProvider } from '@tngraphql/illuminate';
import { Gate, Guard } from '@slynova/fence';

Guard.prototype['any'] = async function(any, resource) {
    if ( ! Array.isArray(any) ) {
        any = [any];
    }

    for await ( const ability of any ) {
        if ( await this.allows(ability, resource) ) {
            return true;
        }
    }
    return false;
}

Guard.prototype['none'] = async function none(any, resource) {
    if ( ! Array.isArray(any) ) {
        any = [any];
    }

    for await ( const ability of any ) {
        if ( ! await this.allows(ability, resource) ) {
            return false
        }
    }

    return true;
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
