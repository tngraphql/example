/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 3/30/2020
 * Time: 8:43 AM
 */
import {Service, ServiceProvider} from "@tngraphql/illuminate";
import {Gate} from "@slynova/fence";

@Service()
export class GateServiceProvider extends ServiceProvider {

    register(): void {
        Gate.define('viewUser', (user: any) => {
            return user.attributes.scopes.includes('viewUser');
        });
    }
}
