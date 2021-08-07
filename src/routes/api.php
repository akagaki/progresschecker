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

Route::get('userIndex', [App\Http\Controllers\ApiController::class, 'userIndex']);
Route::get('teamIndex', [App\Http\Controllers\ApiController::class, 'teamIndex']);
Route::get('projectIndex', [App\Http\Controllers\ApiController::class, 'projectIndex']);
Route::get('taskIndex', [App\Http\Controllers\ApiController::class, 'taskIndex']);

Route::post('/progressUpdate', [App\Http\Controllers\ApiController::class, 'progressUpdate']);

Route::post('/teamAdd', [App\Http\Controllers\ApiController::class, 'teamAdd']);
Route::post('/projectAdd', [App\Http\Controllers\ApiController::class, 'projectAdd']);