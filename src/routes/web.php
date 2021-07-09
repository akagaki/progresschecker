<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
// Team
Route::get('team', [App\Http\Controllers\TeamController::class, 'index']);
Route::get('team/add', [App\Http\Controllers\TeamController::class, 'add']);
Route::post('team/add', [App\Http\Controllers\TeamController::class, 'create']);
Route::get('team/edit', [App\Http\Controllers\TeamController::class, 'edit']);
Route::post('team/edit', [App\Http\Controllers\TeamController::class, 'update']);
Route::get('team/del', [App\Http\Controllers\TeamController::class, 'del']);
Route::post('team/del', [App\Http\Controllers\TeamController::class, 'remove']);
