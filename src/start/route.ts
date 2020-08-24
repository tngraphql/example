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
// Route.mutation('login', 'ExampleResolve.login')
// Route.query('sentmail', 'ExampleResolve.sentmail')

Route.mutation('auth', 'AuthResolve.authMutation')
Route.mutation('authFacebook', 'AuthResolve.authFacebook')
Route.mutation('authGoogle', 'AuthResolve.authGoogle')

Route.query('optionDiscussion', 'OptionResolve.optionDiscussion');
Route.query('optionEmail', 'OptionResolve.optionEmail');
Route.query('optionGeneral', 'OptionResolve.optionGeneral');
Route.query('optionLanguage', 'OptionResolve.optionLanguage');
Route.query('options', 'OptionResolve.options');


Route.mutation('optionDiscussionUpdate', 'OptionResolve.optionDiscussionUpdate');
Route.mutation('optionEmailUpdate', 'OptionResolve.optionEmailUpdate');
Route.mutation('optionGeneralUpdate', 'OptionResolve.optionGeneralUpdate');
Route.mutation('optionSocialUpdate', 'OptionResolve.optionSocialUpdate');
Route.mutation('optionThemeUpdate', 'OptionResolve.optionThemeUpdate');

Route.resource('user', 'UserResolve')
Route.query('profile', 'UserResolve.profile')
Route.mutation('register', 'UserResolve.register');
Route.mutation('profileUpdate', 'UserResolve.profileUpdate');
Route.mutation('register', 'UserResolve.register');
Route.mutation('forgotPassword', 'UserResolve.forgotPassword');
Route.mutation('resetPassword', 'UserResolve.resetPassword');
Route.mutation('userChangePassword', 'UserResolve.userChangePassword');

Route.resource('role', 'RoleResolve')
Route.resource('permission', 'PermissionResolve')

Route.resource('tag', 'TagResolve')['modules']('Tag');

Route.group(() => {
    Route.resource('contact', 'ContactResolve');
    Route.resource('contactReply', 'ContactReplyResolve');
})['modules']('Contact');

Route.group(() => {
    Route.resource('favorite', 'FavoriteResolve');
    Route.query('favoritesUser', 'FavoriteResolve.favoritesUser')
})['modules']('Favorite');

Route.group(() => {
    Route.resource('category', 'CategoryResolve');
})['modules']('Category');

Route.group(() => {
    Route.resource('post', 'PostResolve');
    Route.mutation('postChangeFeature', 'PostResolve.postChangeFeature');
    Route.resource('page', 'PageResolve');
})['modules']('Post');

Route.group(() => {
    Route.resource('comment', 'CommentResolve');
    Route.mutation('commentPostCreate', 'CommentResolve.commentPostCreate');
    Route.mutation('commentPostUpdate', 'CommentResolve.commentPostUpdate');
})['modules']('Comment');

Route.group(() => {
    Route.resource('productType', 'ProductTypeResolve');
    Route.resource('productVendor', 'ProductVendorResolve');

    Route.query('product_master', 'ProductMasterResolve.index');
    Route.query('product_master_list', 'ProductMasterResolve.productMasterList');
    Route.query('product_all_attribute', 'ProductMasterResolve.productAllAttribute');

    Route.mutation('productCreate', 'ProductMasterResolve.create');
    Route.mutation('productUpdate', 'ProductMasterResolve.update');
    Route.mutation('productDelete', 'ProductMasterResolve.delete');
    Route.mutation('productChangeFeature', 'ProductMasterResolve.productChangeFeature');

    Route.query('product_branch', 'ProductBranchResolve.index');
    Route.query('product_branches', 'ProductBranchResolve.list');
    Route.mutation('productBranchDelete', 'ProductBranchResolve.delete');
    Route.mutation('inventory_adjust_quantity', 'ProductBranchResolve.inventoryAdjustQuantity');
})['modules']('Product');

Route.group(() => {
    Route.resource('menu', 'MenuResolve');
    Route.query('menuNavigation', 'MenuResolve.menuNavigation');
})['modules']('Menu');

Route.group(() => {
    Route.resource('language', 'LanguageResolve');
})['modules']('Language');

