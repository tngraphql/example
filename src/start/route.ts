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
//     Route.resource('contact', 'CategoryResolve');
//     Route.resource('contactReply', 'ContactReplyResolve');
// })['modules']('Contact');

// Route.group(() => {
//     Route.resource('favorite', 'FavoriteResolve');
//     Route.query('favoritesUser', 'FavoriteResolve.favoritesUser')
// })['modules']('Favorite');

// Route.group(() => {
//     Route.resource('category', 'CategoryResolve');
// })['modules']('Category');

// Route.group(() => {
//     Route.resource('post', 'PostResolve');
// })['modules']('Post');

// Route.group(() => {
//     Route.resource('comment', 'CommentResolve');
//     Route.mutation('commentPostCreate', 'CommentResolve.commentPostCreate');
//     Route.mutation('commentPostUpdate', 'CommentResolve.commentPostUpdate');
// })['modules']('Comment');

Route.group(() => {
    // Route.resource('productType', 'ProductTypeResolve');
    // Route.resource('productVendor', 'ProductVendorResolve');
    Route.query('product_master', 'ProductMasterResolve.index');
    Route.query('product_master_list', 'ProductMasterResolve.productMasterList');
    Route.mutation('productCreate', 'ProductMasterResolve.create');
    Route.mutation('productUpdate', 'ProductMasterResolve.update');
    Route.mutation('productDelete', 'ProductMasterResolve.delete');
    Route.mutation('productChangeFeature', 'ProductMasterResolve.productChangeFeature');

    Route.query('product_branch', 'ProductBranchResolve.index');
    Route.query('product_branchs', 'ProductBranchResolve.list');
    Route.mutation('productBranchDelete', 'ProductBranchResolve.delete');
    Route.mutation('inventory_adjust_quantity', 'ProductBranchResolve.inventoryAdjustQuantity');

    // Route.mutation('commentPostCreate', 'CommentResolve.commentPostCreate');
    // Route.mutation('commentPostUpdate', 'CommentResolve.commentPostUpdate');
})['modules']('Product');
