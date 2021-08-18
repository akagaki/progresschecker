<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
// データ取得ー-------------------------------------------------------------------------------------
Route::get('userIndex', [App\Http\Controllers\ApiController::class, 'userIndex']);
Route::get('teamIndex', [App\Http\Controllers\ApiController::class, 'teamIndex']);
Route::get('projectIndex', [App\Http\Controllers\ApiController::class, 'projectIndex']);
Route::get('taskIndex', [App\Http\Controllers\ApiController::class, 'taskIndex']);
// 登録ー-------------------------------------------------------------------------------------
Route::post('/teamAdd', [App\Http\Controllers\ApiController::class, 'teamAdd']);
Route::post('/projectAdd', [App\Http\Controllers\ApiController::class, 'projectAdd']);
Route::post('/taskAdd', [App\Http\Controllers\ApiController::class, 'taskAdd']);
// 削除ー-------------------------------------------------------------------------------------
Route::post('/teamDel', [App\Http\Controllers\ApiController::class, 'teamDel']);
Route::post('/projectDel', [App\Http\Controllers\ApiController::class, 'projectDel']);
Route::post('/taskDel', [App\Http\Controllers\ApiController::class, 'taskDel']);
// 編集ー-------------------------------------------------------------------------------------
Route::post('/progressUpdate', [App\Http\Controllers\ApiController::class, 'progressUpdate']);
Route::post('/deadlineUpdate', [App\Http\Controllers\ApiController::class, 'deadlineUpdate']);
//メンバー-------------------------------------------------------------------------------------
Route::post('/userSearch', [App\Http\Controllers\ApiController::class, 'userSearch']);
// 多対多のデータ
Route::post('/teamMemberAdd', [App\Http\Controllers\ApiController::class, 'teamMemberAdd']);
Route::post('/projectMemberAdd', [App\Http\Controllers\ApiController::class, 'projectMemberAdd']);
Route::post('/taskMemberAdd', [App\Http\Controllers\ApiController::class, 'taskMemberAdd']);
// 詳細画面の各項目のメンバーを一覧表示
Route::post('/teamMemberIndex', [App\Http\Controllers\ApiController::class, 'teamMemberIndex']);
Route::post('/projectMemberIndex', [App\Http\Controllers\ApiController::class, 'projectMemberIndex']);
// メンバー登録のセレクトボックスに表示
Route::post('/teamMemberData', [App\Http\Controllers\ApiController::class, 'teamMemberData']);
Route::post('/projectMemberData', [App\Http\Controllers\ApiController::class, 'projectMemberData']);
// 登録済みのメンバーを除外
Route::post('/teamMemberDel', [App\Http\Controllers\ApiController::class, 'teamMemberDel']);
Route::post('/projectMemberDel', [App\Http\Controllers\ApiController::class, 'projectMemberDel']);