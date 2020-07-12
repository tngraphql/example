/**
 * Created by Phan Trung Nguyên.
 * User: nguyenpl117
 * Date: 5/20/2020
 * Time: 1:35 PM
 */

import {QueryClientContract} from "@tngraphql/lucid/build/src/Contracts/Database/QueryClientContract";
import {Application} from "@tngraphql/illuminate";
import {Kernel} from "../src/app/GraphQL/Kernel";
import {ApolloServer} from "apollo-server";
import {GraphQLExceptions} from "../src/app/Exceptions/GraphQLExceptions";
import {Ace} from "@tngraphql/illuminate/dist/Support/Facades/Ace";
import {Hash} from "@tngraphql/illuminate/dist/Support/Facades/Hash";
import {Context} from "@tngraphql/graphql/dist/resolvers/context";
import {RequestGuard} from "@tngraphql/auth/dist/src/Guards/RequestGuard";
import {UserModel} from "../src/app/UserModel";
import {merge} from "../src/lib/utils";

export async function setup(destroyDb: boolean = true) {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await Ace.call('migration:run', []);

    const hasProfilesTable = await db.schema.hasTable('profiles');
    if (!hasProfilesTable) {
        await db.schema.createTable('profiles', (table) => {
            table.increments()
            table.string('name', 121);
            table.string('user_id', 121);
            table.timestamps(true);
        });
        await db.table('profiles').insert({
            name: 'nguyen',
            user_id: '1'
        });
    }

    if ( destroyDb ) {
        await database.manager.closeAll();
    }
}

export const setupDB = setup;

export async function seedDB(destroyDb: boolean = true) {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await db.table('users').insert({
        name: 'Phan Trung Nguyên',
        avatar: 'https://phantrungnguyen.com/avatar.png',
        phone: '0357096209',
        password: Hash.make('123456'),
        dob: '2019-01-01',
        email: 'nguyenpl117@gmail.com',
        gender: '2',
        created_at: new Date(),
        updated_at: new Date()
    });

    const insertRole = true
    if (insertRole) {
        const data = `INSERT INTO \`roles\` VALUES (1, 'owner', 'Project Owner', 'User is the owner of a given project', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`roles\` VALUES (2, 'admin', 'Quản trị viên', 'User is allowed to manage and edit other users', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`roles\` VALUES (3, 'member', 'Thành viên', 'User is allowed to manage and edit other users', '2020-06-03 07:49:10', '2020-06-03 07:49:10');`;
        await Promise.all(data.split(';').filter(x => !!x.trim()).map(value => {
            return db.schema.raw(value);
        }))
    }

    const insertRoleUser = true;
    if (insertRoleUser) {
        await db.schema.raw(`INSERT INTO \`role_user\` VALUES (1, 1, 1);`);
    }

    const insertPermissions = true
    if (insertPermissions) {
        const data = `INSERT INTO \`permissions\` VALUES (1, 'user-create', 'Create User', 'Create New User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (2, 'user-update', 'Update User', 'Update User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (3, 'user-delete', 'Delete User', 'Delete User', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (4, 'post-create', 'Create Post', 'Create New Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (5, 'post-update', 'Update Post', 'Update Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (6, 'post-delete', 'Delete Post', 'Delete Post', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (7, 'category-create', 'Create Category', 'Create New Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (8, 'category-update', 'Update Category', 'Update Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (9, 'category-delete', 'Delete Category', 'Delete Category', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (10, 'role-create', 'Create Role', 'Create New Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (11, 'role-update', 'Update Role', 'Update Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (12, 'role-delete', 'Delete Role', 'Delete Role', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (13, 'tag-create', 'Create Tag', 'Create New Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (14, 'tag-update', 'Update Tag', 'Update Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (15, 'tag-delete', 'Delete Tag', 'Delete Tag', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (16, 'page-create', 'Create Page', 'Create New Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (17, 'page-update', 'Update Page', 'Update Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (18, 'page-delete', 'Delete Page', 'Delete Page', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (19, 'menu-create', 'Create Menu', 'Create New Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (20, 'menu-update', 'Update Menu', 'Update Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');
INSERT INTO \`permissions\` VALUES (21, 'menu-delete', 'Delete Menu', 'Delete Menu', '2020-06-03 07:49:10', '2020-06-03 07:49:10');`
        await Promise.all(data.split(';').filter(x => !!x.trim()).map(value => {
            return db.schema.raw(value);
        }))
    }

    const insertPermissionRole = true
    if (insertPermissionRole) {
        const data = `INSERT INTO \`permission_role\` VALUES (1, 1, 1);
INSERT INTO \`permission_role\` VALUES (2, 2, 1);
INSERT INTO \`permission_role\` VALUES (3, 3, 1);
INSERT INTO \`permission_role\` VALUES (4, 4, 1);
INSERT INTO \`permission_role\` VALUES (5, 5, 1);
INSERT INTO \`permission_role\` VALUES (6, 6, 1);
INSERT INTO \`permission_role\` VALUES (7, 7, 1);
INSERT INTO \`permission_role\` VALUES (8, 8, 1);
INSERT INTO \`permission_role\` VALUES (9, 9, 1);
INSERT INTO \`permission_role\` VALUES (10, 10, 1);
INSERT INTO \`permission_role\` VALUES (11, 11, 1);
INSERT INTO \`permission_role\` VALUES (12, 12, 1);
INSERT INTO \`permission_role\` VALUES (13, 13, 1);
INSERT INTO \`permission_role\` VALUES (14, 14, 1);
INSERT INTO \`permission_role\` VALUES (15, 15, 1);
INSERT INTO \`permission_role\` VALUES (16, 16, 1);
INSERT INTO \`permission_role\` VALUES (17, 17, 1);
INSERT INTO \`permission_role\` VALUES (18, 18, 1);
INSERT INTO \`permission_role\` VALUES (19, 19, 1);
INSERT INTO \`permission_role\` VALUES (20, 20, 1);
INSERT INTO \`permission_role\` VALUES (21, 21, 1);
INSERT INTO \`permission_role\` VALUES (22, 1, 2);
INSERT INTO \`permission_role\` VALUES (23, 2, 2);
INSERT INTO \`permission_role\` VALUES (24, 3, 2);
INSERT INTO \`permission_role\` VALUES (25, 4, 2);
INSERT INTO \`permission_role\` VALUES (26, 5, 2);
INSERT INTO \`permission_role\` VALUES (27, 6, 2);
INSERT INTO \`permission_role\` VALUES (28, 7, 2);
INSERT INTO \`permission_role\` VALUES (29, 8, 2);
INSERT INTO \`permission_role\` VALUES (30, 9, 2);
INSERT INTO \`permission_role\` VALUES (31, 13, 2);
INSERT INTO \`permission_role\` VALUES (32, 14, 2);
INSERT INTO \`permission_role\` VALUES (33, 15, 2);
INSERT INTO \`permission_role\` VALUES (34, 16, 2);
INSERT INTO \`permission_role\` VALUES (35, 17, 2);
INSERT INTO \`permission_role\` VALUES (36, 18, 2);
INSERT INTO \`permission_role\` VALUES (37, 19, 2);
INSERT INTO \`permission_role\` VALUES (38, 20, 2);
INSERT INTO \`permission_role\` VALUES (39, 21, 2);
INSERT INTO \`permission_role\` VALUES (40, 4, 3);
INSERT INTO \`permission_role\` VALUES (41, 5, 3);
INSERT INTO \`permission_role\` VALUES (42, 6, 3);
INSERT INTO \`permission_role\` VALUES (43, 7, 3);
INSERT INTO \`permission_role\` VALUES (44, 8, 3);
INSERT INTO \`permission_role\` VALUES (45, 9, 3);
INSERT INTO \`permission_role\` VALUES (46, 13, 3);
INSERT INTO \`permission_role\` VALUES (47, 14, 3);
INSERT INTO \`permission_role\` VALUES (48, 15, 3);
INSERT INTO \`permission_role\` VALUES (49, 16, 3);
INSERT INTO \`permission_role\` VALUES (50, 17, 3);
INSERT INTO \`permission_role\` VALUES (51, 18, 3);`
        await Promise.all(data.split(';').filter(x => !!x.trim()).map(value => {
            return db.schema.raw(value);
        }))
    }

    const insertOption = true
    if (insertOption) {
        const data = `
        INSERT INTO \`options\` VALUES (1, 'siteurl', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (2, 'home', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (3, 'blogname', 'https://phantrungnguyen.com/', 'yes');
INSERT INTO \`options\` VALUES (4, 'logo', '', 'yes');
INSERT INTO \`options\` VALUES (5, 'favicon', '', 'yes');
INSERT INTO \`options\` VALUES (6, 'blogdescription', 'Mô tả blog', 'yes');
INSERT INTO \`options\` VALUES (7, 'usersCanRegister', '0', 'yes');
INSERT INTO \`options\` VALUES (8, 'adminEmail', 'nguyenpl117@gmail.com', 'yes');
INSERT INTO \`options\` VALUES (9, 'defaultRole', 'member', 'yes');
INSERT INTO \`options\` VALUES (10, 'defaultCommentStatus', '1', 'yes');
INSERT INTO \`options\` VALUES (11, 'commentOrder', 'ASC', 'yes');
INSERT INTO \`options\` VALUES (12, 'commentModeration', '0', 'yes');
INSERT INTO \`options\` VALUES (13, 'commentModerationKeys', '', 'no');
INSERT INTO \`options\` VALUES (14, 'commentBlacklistKeys', '', 'no');
INSERT INTO \`options\` VALUES (15, 'commentMaxLinks', '2', 'yes');
INSERT INTO \`options\` VALUES (16, 'headerNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (17, 'mainNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (18, 'footerNavigation', '{\\"1\\":1}', 'yes');
INSERT INTO \`options\` VALUES (19, 'defaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (20, 'hideDefaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (21, 'displayLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (22, 'hideLanguage', '[\\"1\\",\\"2\\"]', 'yes');
INSERT INTO \`options\` VALUES (23, 'showItemDefaultLanguage', '1', 'yes');
INSERT INTO \`options\` VALUES (24, 'SMTPHost', 'smtp.gmail.com', 'yes');
INSERT INTO \`options\` VALUES (25, 'SMTPEncryption', '1', 'yes');
INSERT INTO \`options\` VALUES (26, 'SMTPPort', '587', 'yes');
INSERT INTO \`options\` VALUES (27, 'SMTPUsername', 'example@gmail.com', 'yes');
INSERT INTO \`options\` VALUES (28, 'SMTPPassword', 'cjthfdyxjycnwotw', 'yes');
INSERT INTO \`options\` VALUES (29, 'SMTPSenderName', 'example', 'yes');
INSERT INTO \`options\` VALUES (30, 'SMTPSenderEmail', 'hello@example.com', 'yes');
INSERT INTO \`options\` VALUES (38, 'socialLogin', '1', 'yes');
INSERT INTO \`options\` VALUES (39, 'facebookLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (40, 'facebookClientId', '', 'yes');
INSERT INTO \`options\` VALUES (41, 'facebookClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (42, 'facebookScopes', '', 'yes');
INSERT INTO \`options\` VALUES (43, 'facebookRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (44, 'googleLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (45, 'googleClientId', '', 'yes');
INSERT INTO \`options\` VALUES (46, 'googleClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (47, 'googleScopes', '', 'yes');
INSERT INTO \`options\` VALUES (48, 'googleRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (49, 'githubLoginEnable', '0', 'yes');
INSERT INTO \`options\` VALUES (50, 'githubClientId', '', 'yes');
INSERT INTO \`options\` VALUES (51, 'githubClientSecret', '', 'yes');
INSERT INTO \`options\` VALUES (52, 'githubScopes', '', 'yes');
INSERT INTO \`options\` VALUES (53, 'githubRedirectURL', '', 'yes');
INSERT INTO \`options\` VALUES (54, 'autoRegister', '1', 'yes');
INSERT INTO \`options\` VALUES (55, 'autoRegisterDisabledMessage', 'Registration is disabled for this website. Please contact the administrator for any queries.', 'yes');
INSERT INTO \`options\` VALUES (56, 'socialRegisterRole', '3', 'yes');
`;
        await Promise.all(data.split(';').filter(x => !!x.trim()).map(value => {
            return db.schema.raw(value);
        }))
    }

    const insertLanguages = true
    if (insertLanguages) {
        await db.schema.raw(`INSERT INTO \`languages\` VALUES (1, 'Tiếng Việt', 'vi', 'vi', '1', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Flag_of_North_Vietnam_%281955%E2%80%931975%29.svg/800px-Flag_of_North_Vietnam_%281955%E2%80%931975%29.svg.png', 0, 'publish', '2020-06-03 07:49:10', '2020-06-03 07:49:10', NULL);`);
    }

    const insertProfile = true;
    if (!insertProfile) {
        await db.table('profiles').insert({
            name: 'nguyen',
            user_id: '1'
        });
    }

    if ( destroyDb ) {
        await database.manager.closeAll();
    }
}

/**
 * Does cleanup removes database
 */
export async function cleanup(customTables?: string[]) {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await Ace.call('migration:reset', []);

    if ( customTables ) {
        await Promise.all(customTables.map((table) => db.schema.dropTableIfExists(table)))
        await database.manager.closeAll();
        return
    }

    await db.schema.dropTableIfExists('users')
    await db.schema.dropTableIfExists('profiles')
    await db.schema.dropTableIfExists('tngraphql_schema')

    await database.manager.closeAll();
}

/**
 * Reset database tables
 */
export async function resetTables() {
    const database = Application.getInstance<Application>().db;
    const db: QueryClientContract = database.connection();

    await db.truncate('users');
    await db.truncate('roles');
    await db.truncate('role_user');
    await db.truncate('permissions');
    await db.truncate('permission_role');
    await db.truncate('options');
    await db.truncate('languages');
    await db.truncate('profiles');

    await database.manager.closeAll();
}
// @ts-ignore
ApolloServer.prototype.setContext = function setContext(newContext) {
    this.context = newContext;
}

// @ts-ignore
ApolloServer.prototype.mergeContext = function mergeContext(partialContext) {
    this.context = Object.assign({}, this.context, partialContext);
}

// @ts-ignore
ApolloServer.prototype.mergeHeaders = function mergeHeaders(headers) {
    // console.log(this.context.toString())
    // this.context.bind(this, {req: {headers}})
    //
    this.context = merge({}, this.context, {
        req: {headers}
    });
}

export async function createServer(context = {}): Promise<ApolloServer> {
    const app = Application.getInstance<Application>();
    const kernel = await app.make<Kernel>('Illuminate/Foundation/GraphQL/Kernel');

    return new ApolloServer({
        schema: await kernel.complie(),
        formatError: GraphQLExceptions.handle.bind(app),
        context: ctx => {
            return merge(ctx, context, {
                req: {
                    bearerToken: () => null
                }
            });
        }
    });
}

export function authContext(data: {id: string} = {id: "1"}) {
    Context.getter('auth', () => {
        return new RequestGuard(() => {
            if (!data) {
                return null;
            }
            if (data instanceof UserModel) {
                return data;
            }
            const user = new UserModel();
            user.fill(data);
            return user;
        }, {}, {} as any)
    });
}