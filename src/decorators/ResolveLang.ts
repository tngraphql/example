import { registerCustomInject } from '@tngraphql/illuminate';
import { ResolverData } from '@tngraphql/graphql';

/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 7/18/2020
 * Time: 2:48 PM
 */

export const ResolveLang = registerCustomInject((data: ResolverData<{ lang: any }>) => {
    return data.context.lang;
})