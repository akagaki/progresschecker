<?php

use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
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

// Auth::routes(['verify' => true]);
Auth::routes();
Route::middleware('verified')->group(function() {
// メール認証が必要なルートをここに追加（下記全部）
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home')->middleware('auth');
// Mypege
Route::get('/mypage', [App\Http\Controllers\MypageController::class, 'index'])->middleware('auth');
// Team
Route::get('team', [App\Http\Controllers\TeamController::class, 'index'])->middleware('auth');
Route::get('team/add', [App\Http\Controllers\TeamController::class, 'add'])->middleware('auth');
Route::post('team/add', [App\Http\Controllers\TeamController::class, 'create'])->middleware('auth');
Route::get('team/edit', [App\Http\Controllers\TeamController::class, 'edit'])->middleware('auth');
Route::post('team/edit', [App\Http\Controllers\TeamController::class, 'update'])->middleware('auth');
Route::get('team/del', [App\Http\Controllers\TeamController::class, 'del'])->middleware('auth');
Route::post('team/del', [App\Http\Controllers\TeamController::class, 'remove'])->middleware('auth');
Route::get('team/show', [App\Http\Controllers\TeamController::class, 'show'])->middleware('auth');
Route::get('team/store', [App\Http\Controllers\TeamController::class, 'store'])->middleware('auth');
Route::post('team/store', [App\Http\Controllers\TeamController::class, 'search'])->middleware('auth');
Route::post('team/member', [App\Http\Controllers\TeamController::class, 'teamadd'])->middleware('auth');
Route::get('team/memberdel', [App\Http\Controllers\TeamController::class, 'memberdel'])->middleware('auth');
Route::post('team/memberdel', [App\Http\Controllers\TeamController::class, 'memberremove'])->middleware('auth');
// Project
Route::get('project', [App\Http\Controllers\ProjectController::class, 'index'])->middleware('auth');
Route::get('project/add', [App\Http\Controllers\ProjectController::class, 'add'])->middleware('auth');
Route::post('project/add', [App\Http\Controllers\ProjectController::class, 'create'])->middleware('auth');
Route::get('project/edit', [App\Http\Controllers\ProjectController::class, 'edit'])->middleware('auth');
Route::post('project/edit', [App\Http\Controllers\ProjectController::class, 'update'])->middleware('auth');
Route::get('project/del', [App\Http\Controllers\ProjectController::class, 'del'])->middleware('auth');
Route::post('project/del', [App\Http\Controllers\ProjectController::class, 'remove'])->middleware('auth');
Route::get('project/show', [App\Http\Controllers\ProjectController::class, 'show'])->middleware('auth');
Route::get('project/store', [App\Http\Controllers\ProjectController::class, 'store'])->middleware('auth');
Route::post('project/store', [App\Http\Controllers\ProjectController::class, 'projectadd'])->middleware('auth');
Route::get('project/memberdel', [App\Http\Controllers\ProjectController::class, 'memberdel'])->middleware('auth');
Route::post('project/memberdel', [App\Http\Controllers\ProjectController::class, 'memberremove'])->middleware('auth');
// Task
Route::get('task', [App\Http\Controllers\TaskController::class, 'index'])->middleware('auth');
Route::get('task/add', [App\Http\Controllers\TaskController::class, 'add'])->middleware('auth');
Route::post('task/add', [App\Http\Controllers\TaskController::class, 'create'])->middleware('auth');
Route::get('task/edit', [App\Http\Controllers\TaskController::class, 'edit'])->middleware('auth');
Route::get('task/memberedit', [App\Http\Controllers\TaskController::class, 'memberedit'])->middleware('auth');
Route::get('task/progressedit', [App\Http\Controllers\TaskController::class, 'progressedit'])->middleware('auth');
Route::get('task/deadlineedit', [App\Http\Controllers\TaskController::class, 'deadlineedit'])->middleware('auth');
Route::post('task/memberedit', [App\Http\Controllers\TaskController::class, 'update'])->middleware('auth');
Route::post('task/progressedit', [App\Http\Controllers\TaskController::class, 'update'])->middleware('auth');
Route::post('task/deadlineedit', [App\Http\Controllers\TaskController::class, 'update'])->middleware('auth');
Route::post('task/edit', [App\Http\Controllers\TaskController::class, 'update'])->middleware('auth');
Route::get('task/del', [App\Http\Controllers\TaskController::class, 'del'])->middleware('auth');
Route::post('task/del', [App\Http\Controllers\TaskController::class, 'remove'])->middleware('auth');
Route::get('task/show', [App\Http\Controllers\TaskController::class, 'show'])->middleware('auth');

// ログイン情報取得API
Route::middleware('auth')->get('api/loginUser', [App\Http\Controllers\ApiController::class, 'loginUser']);
Route::middleware('auth')->get('api/userTeams', [App\Http\Controllers\ApiController::class, 'userTeams']);
Route::middleware('auth')->get('api/userProjects', [App\Http\Controllers\ApiController::class, 'userProjects']);
Route::middleware('auth')->get('api/userTasks', [App\Http\Controllers\ApiController::class, 'userTasks']);
Route::middleware('auth')->get('api/incompTasks', [App\Http\Controllers\ApiController::class, 'incompTasks']);
