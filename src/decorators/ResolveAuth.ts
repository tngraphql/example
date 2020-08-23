import {registerCustomInject} from "@tngraphql/illuminate";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/18/2020
 * Time: 2:48 PM
 */

export const ResolveAuth = registerCustomInject<{auth: RequestGuard}>(({context}) => {
    return context.auth;
})