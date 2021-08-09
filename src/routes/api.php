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
// データ取得
Route::get('userIndex', [App\Http\Controllers\ApiController::class, 'userIndex']);
Route::get('teamIndex', [App\Http\Controllers\ApiController::class, 'teamIndex']);
Route::get('projectIndex', [App\Http\Controllers\ApiController::class, 'projectIndex']);
Route::get('taskIndex', [App\Http\Controllers\ApiController::class, 'taskIndex']);

Route::post('/progressUpdate', [App\Http\Controllers\ApiController::class, 'progressUpdate']);
// 登録
Route::post('/teamAdd', [App\Http\Controllers\ApiController::class, 'teamAdd']);
Route::post('/projectAdd', [App\Http\Controllers\ApiController::class, 'projectAdd']);
Route::post('/taskAdd', [App\Http\Controllers\ApiController::class, 'taskAdd']);
// 削除
Route::post('/teamDel', [App\Http\Controllers\ApiController::class, 'teamDel']);
Route::post('/projectDel', [App\Http\Controllers\ApiController::class, 'projectDel']);
Route::post('/taskDel', [App\Http\Controllers\ApiController::class, 'taskDel']);