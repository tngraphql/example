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
Route.query('profile', 'UserResolve.profile')
// Route.query('sentmail', 'ExampleResolve.sentmail')

Route.resource('user', 'UserResolve')
Route.resource('mony', 'MonyResolve')
