/*
|--------------------------------------------------------------------------
| GraphQL Query OR Mutation Routes
|--------------------------------------------------------------------------
|
| Đây là nơi đăng ký các Queries hoặc Mutations cho ứng dụng của bạn.
| các Queries hoặc Mutations được tải bởi RouteServiceProvider trong một nhóm
| "default" có chứa các `middleware`.
| Now create something great!
|
*/

import { Route } from '@tngraphql/illuminate/dist/Support/Facades';

// Route.query('user', 'ExampleResolve.create');
//
// Route.query('user234', 'ExampleResolve.sfasf2')
Route.mutation('login', 'ExampleResolve.login')

// Route.query('sentmail', 'ExampleResolve.sentmail')


// Route.query('profile', 'UserResolve.profile')
// Route.resource('user', 'UserResolve')


// Route.resource('role', 'RoleResolve')
// Route.resource('permission', 'PermissionResolve')
//
// Route.resource('tag', 'TagResolve')['modules']('Tag');
//
// Route.group(() => {
//     Route.resource('contact', 'ContactResolve');
//     Route.resource('contactReply', 'ContactReplyResolve');
// })['modules']('Contact');

Route.group(() => {
    Route.resource('favorite', 'FavoriteResolve');
    Route.query('favoritesUser', 'FavoriteResolve.favoritesUser')
})['modules']('Favorite');