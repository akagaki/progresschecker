<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

    public function add(Request $request)
    {
        $user = Auth::user(); 
        $project = Project::find($request->id);
        return view('task.add',['user' => $user],['project' => $project]);
    }

    public function create(Request $request)
    {
        $project = Project::find($request->project_id);
        $this->validate($request, Task::$rules);
        $task = new Task;
        $form = $request->all();
        unset($form['_token']);
        $task->fill($form)->save();
        $param = ['task_id' => $task->id, 'user_id' => $request->member_id];
        DB::table('task_user')->insert($param);
        return view('project.show', ['project' => $project]);
    }

    public function edit(Request $request)
    {
        $task = Task::find($request->id);
        return view('task.edit', ['form' => $task]);
    }

    public function update(Request $request)
    {
        $this->validate($request, Task::$rules);
        $task = Task::find($request->id);
        $form = $request->all();
        unset($form['_token']);
        $task->fill($form)->save();
        return redirect('/home');
    }

    public function del(Request $request)
    {
        $task = Task::find($request->id);
        return view('task.del', ['form' => $task]);
    }

    public function remove(Request $request)
    {
        Task::find($request->id)->delete();
        return redirect('/home');
    }

    public function show(Request $request)
    {
        $task = Task::find($request->id);
        return view('task.show', ['task' => $task]);
    }
}
