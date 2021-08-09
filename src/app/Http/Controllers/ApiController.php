<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // 一覧取得
    public function userIndex()
    {
        $users = User::all();
        return $users;
    }
    public function teamIndex()
    {
        $teams = Team::all();
        return $teams;
    }
    public function projectIndex()
    {
        $projects = Project::all();
        return $projects;
    }
    public function taskIndex()
    {
        $tasks = Task::all();
        return $tasks;
    }
    // ログイン情報取得
    public function loginUser()
    {
        $loginUser = Auth::user();
        return $loginUser;
    }
    public function userTeams()
    {
        $userTeams = Auth::user()->userTeams->sortByDesc('id')->values();
        return $userTeams;
    }
    public function userProjects()
    {
        $userProjects = Auth::user()->userProjects->sortByDesc('id')->values();
        return $userProjects;
    }
    public function userTasks()
    {
        $userTasks = Auth::user()->userTasks->sortByDesc('id')->values();
        return $userTasks;
    }
    // マイページ進捗更新
    public function progressUpdate(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $task = Task::find($data["id"]);
        $task->progress = $data["progress"];
        $task->user_id = $task->users[0]->id;
        $task->save();
        $taskName = $task->name;
        $text = "${taskName}の進捗情報を更新しました";
        return $text;
    }
    // 未完了のタスクを期日順に取得
    public function incompTasks()
    {
        $tasks = Auth::user()->userTasks->sortBy('deadline');
        foreach($tasks as $task){
            if($task->progress < 3){
                $incompTasks[]=$task;
            }
        }
        if(empty($incompTasks)){
            $notIncomp = 'null';
            return $notIncomp;
        }else{
            return $incompTasks;
        }
    }
//登録 -----------------------------------------------------------------------------------

    // 新規チーム登録
    public function teamAdd(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $this->validate($request, Team::$rules);
        $team = new Team;
        unset($data['_token']);
        $team->fill($data)->save();
        $team->users()->attach($data['user_id']);
        return response("新規チームを作成しました\nメンバーを登録してください");
    }
    // 新規プロジェクト登録
    public function projectAdd(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $this->validate($request, Project::$rules);
        $project = new Project;
        unset($data['_token']);
        $project->fill($data)->save();
        $project->users()->attach($data['user_id']);
        return response("新規プロジェクトを作成しました\nメンバーを登録してください");
    }
    // 新規タスク登録
    public function taskAdd(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $this->validate($request, Task::$rules);
        $task = new Task;
        unset($data['_token']);
        $task->fill($data)->save();
        $task->users()->attach($data['user_id']);
        return response("新規タスクを作成しました\n担当者を登録してください");
    }
// 削除-----------------------------------------------------------------------------------

    public function teamDel()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        Team::find($data["id"])->delete();
        return response("チームを削除しました");
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
