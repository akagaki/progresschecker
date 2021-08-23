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
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
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
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'information' => 'required',
            'user_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response("入力が正しくありません");
        }else{
            $team = new Team;
            unset($data['_token']);
            $team->fill($data)->save();
            $team->users()->attach($data['user_id']);
            return response("新規チームを作成しました\nメンバーを登録してください");
        }
    }
    // 新規プロジェクト登録
    public function projectAdd(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'team_id' => 'required',
            'name' => 'required',
            'information' => 'required'
        ]);
        if ($validator->fails()) {
            return response("入力が正しくありません");
        }else{
        $project = new Project;
        unset($data['_token']);
        $project->fill($data)->save();
        $project->users()->attach($data['user_id']);
        return response("新規プロジェクトを作成しました\nメンバーを登録してください");
        }
    }
    // 新規タスク登録
    public function taskAdd(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'project_id' => 'required',
            'name' => 'required',
            'information' => 'required',
            'progress' => 'required',
            'deadline' => 'required',
        ]);
        if ($validator->fails()) {
            return response("入力が正しくありません");
        }else{
        $task = new Task;
        unset($data['_token']);
        $task->fill($data)->save();
        $task->users()->attach($data['user_id']);
        return response("新規タスクを作成しました\n担当者を登録してください");
        } 
    }
// 削除-----------------------------------------------------------------------------------

    public function teamDel()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        Team::find($data["id"])->delete();
        return response("チームを削除しました");
    }
    public function projectDel()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        Project::find($data["id"])->delete();
        return response("プロジェクトを削除しました");
    }
    public function taskDel()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        Task::find($data["id"])->delete();
        return response("タスクを削除しました");
    }
// 編集-----------------------------------------------------------------------------------
    // タスクの進捗編集
    public function progressUpdate(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $task = Task::find($data["id"]);
        $task->progress = $data["progress"];
        $task->user_id = $task->users[0]->id;
        $task->save();
        $taskName = $task->name;
        $text = "${taskName}の進捗を更新しました";
        return $text;
    }
    // タスクの期日編集
    public function deadlineUpdate(Request $request)
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $task = Task::find($data["id"]);
        $task->deadline = $data["deadline"];
        $task->user_id = $task->users[0]->id;
        $task->save();
        $taskName = $task->name;
        $text = "${taskName}の期日を更新しました";
        return $text;
    }
    // チームメンバーの名前一覧を取得
    public function teamMemberIndex()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $team = Team::find($data["id"]);
        foreach ($team->users as $user) {
            $members[] = $user->name;    
        }
        return $members;
    }
    // プロジェクトメンバーの名前一覧を取得
    public function projectMemberIndex()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $project = Project::find($data["id"]);
        foreach ($project->users as $user) {
            $members[] = $user->name;    
        }
        return $members;
    }
    // チームに登録するユーザーを全ユーザーからメールアドレスで検索
    public function userSearch()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $user = User::where('email', $data)->first();
        return $user;
    }
    // チームメンバー登録
    public function teamMemberAdd()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $team = Team::find($data["team_id"]);
        foreach ($team->users as $user) {
            if( $user->id == $data['user_id']){
                return response("既に登録済みのメンバーです");
            }
        } 
        $team->users()->attach($data['user_id']);
        return response("新規チームメンバーを登録しました");
    }
    // プロジェクトメンバー登録のセレクトボックスに表示するデータ
    public function teamMemberData()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $team = Team::find($data["id"]);
        foreach ($team->users as $user) {
            $members[] = $user;    
        }
        return $members;
    }
    // タスク担当登録のセレクトボックスに表示するデータ
    public function projectMemberData()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $project = Project::find($data["id"]);
        foreach ($project->users as $user) {
            $members[] = $user;    
        }
        return $members;
    }
    // チームメンバーから選択したメンバーをプロジェクトメンバー登録
    public function projectMemberAdd()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $project = Project::find($data["project_id"]);
        foreach ($project->users as $user) {
            if( $user->id == $data['user_id']){
                return response("既に登録済みのメンバーです");
            }
        } 
        $project->users()->attach($data['user_id']);
        return response("新規プロジェクトメンバーを登録しました");
    }
    // プロジェクトメンバーから選択したメンバーをタスク担当に登録
    public function taskMemberAdd()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $task = Task::find($data["task_id"]);
        $task->users()->detach();//ここで担当をリセット
        $task->users()->attach($data['user_id']);
        return response("担当者を変更しました");
    }
    // チームメンバーから選択したメンバーを除外
    public function teamMemberDel()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $team = Team::find($data["team_id"]);
        $team->users()->detach($data['user_id']);
        return response("メンバーを削除しました");
    }
    // チームメンバーから選択したメンバーを除外
    public function projectMemberDel()
    {   
        $data = json_decode(file_get_contents("php://input"), true);
        $project = Project::find($data["project_id"]);
        $project->users()->detach($data['user_id']);
        return response("メンバーを削除しました");
    }
}
