import {registerCustomInject} from "@tngraphql/illuminate";

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/18/2020
 * Time: 2:48 PM
 */

export const ResolveAuth = registerCustomInject(({context}) => {
    return context.auth;
})