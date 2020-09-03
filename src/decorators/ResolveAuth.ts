/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/18/2020
 * Time: 2:48 PM
 */
import { registerCustomInject } from '@tngraphql/illuminate';

export const ResolveAuth = registerCustomInject(({ context }) => {
    return context.auth;
});