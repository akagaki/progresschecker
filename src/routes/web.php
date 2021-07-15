<?php

use App\Models\Project;
use App\Models\Task;
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
// Mypege
Route::get('/mypage', [App\Http\Controllers\MypageController::class, 'index']);
// Team
Route::get('team', [App\Http\Controllers\TeamController::class, 'index']);
Route::get('team/add', [App\Http\Controllers\TeamController::class, 'add']);
Route::post('team/add', [App\Http\Controllers\TeamController::class, 'create']);
Route::get('team/edit', [App\Http\Controllers\TeamController::class, 'edit']);
Route::post('team/edit', [App\Http\Controllers\TeamController::class, 'update']);
Route::get('team/del', [App\Http\Controllers\TeamController::class, 'del']);
Route::post('team/del', [App\Http\Controllers\TeamController::class, 'remove']);
Route::get('team/show', [App\Http\Controllers\TeamController::class, 'show']);
Route::get('team/store', [App\Http\Controllers\TeamController::class, 'store']);
Route::post('team/store', [App\Http\Controllers\TeamController::class, 'search']);
Route::post('team/member', [App\Http\Controllers\TeamController::class, 'teamadd']);
Route::get('team/memberdel', [App\Http\Controllers\TeamController::class, 'memberdel']);
Route::post('team/memberdel', [App\Http\Controllers\TeamController::class, 'memberremove']);
// Project
Route::get('project', [App\Http\Controllers\ProjectController::class, 'index']);
Route::get('project/add', [App\Http\Controllers\ProjectController::class, 'add']);
Route::post('project/add', [App\Http\Controllers\ProjectController::class, 'create']);
Route::get('project/edit', [App\Http\Controllers\ProjectController::class, 'edit']);
Route::post('project/edit', [App\Http\Controllers\ProjectController::class, 'update']);
Route::get('project/del', [App\Http\Controllers\ProjectController::class, 'del']);
Route::post('project/del', [App\Http\Controllers\ProjectController::class, 'remove']);
Route::get('project/show', [App\Http\Controllers\ProjectController::class, 'show']);
Route::get('project/store', [App\Http\Controllers\ProjectController::class, 'store']);
Route::post('project/store', [App\Http\Controllers\ProjectController::class, 'projectadd']);
Route::get('project/memberdel', [App\Http\Controllers\ProjectController::class, 'memberdel']);
Route::post('project/memberdel', [App\Http\Controllers\ProjectController::class, 'memberremove']);
// Task
Route::get('task', [App\Http\Controllers\TaskController::class, 'index']);
Route::get('task/add', [App\Http\Controllers\TaskController::class, 'add']);
Route::post('task/add', [App\Http\Controllers\TaskController::class, 'create']);
Route::get('task/edit', [App\Http\Controllers\TaskController::class, 'edit']);
Route::get('task/memberedit', [App\Http\Controllers\TaskController::class, 'memberedit']);
Route::get('task/progressedit', [App\Http\Controllers\TaskController::class, 'progressedit']);
Route::get('task/deadlineedit', [App\Http\Controllers\TaskController::class, 'deadlineedit']);
Route::post('task/memberedit', [App\Http\Controllers\TaskController::class, 'update']);
Route::post('task/progressedit', [App\Http\Controllers\TaskController::class, 'update']);
Route::post('task/deadlineedit', [App\Http\Controllers\TaskController::class, 'update']);
Route::post('task/edit', [App\Http\Controllers\TaskController::class, 'update']);
Route::get('task/del', [App\Http\Controllers\TaskController::class, 'del']);
Route::post('task/del', [App\Http\Controllers\TaskController::class, 'remove']);
Route::get('task/show', [App\Http\Controllers\TaskController::class, 'show']);