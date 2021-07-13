<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    
    public function add(Request $request)
    {
        $user = Auth::user(); 
        $team = Team::find($request->id);
        return view('project.add',['user' => $user],['team' => $team]);
    }

    public function create(Request $request)
    {
        $this->validate($request, Project::$rules);
        $project = new Project;
        $form = $request->all();
        unset($form['_token']);
        $project->fill($form)->save();
        return view('project.show', ['project' => $project]);
    }

    public function edit(Request $request)
    {
        $project = Project::find($request->id);
        return view('project.edit', ['form' => $project]);
    }

    public function update(Request $request)
    {
        $this->validate($request, Project::$rules);
        $project = Project::find($request->id);
        $form = $request->all();
        unset($form['_token']);
        $project->fill($form)->save();
        return view('project.show', ['project' => $project]);
    }

    public function del(Request $request)
    {
        $project = Project::find($request->id);
        return view('project.del', ['form' => $project]);
    }

    public function remove(Request $request)
    {
        Project::find($request->id)->delete();
        return redirect('/home');
    }

    public function show(Request $request)
    {
        $project = Project::find($request->id);
        return view('project.show', ['project' => $project]);
    }

    public function store(Request $request)
    {
        $project = Project::find($request->id);
        $team = Team::find($project->ownerTeamId());
        return view('project.store', ['project' => $project],['team' => $team]);
    }

    public function projectadd(Request $request)
    {   
        $project = Project::find($request->id);
        $param = ['project_id' => $request->project_id, 'user_id' => $request->user_id];
        DB::table('project_user')->insert($param);
        return view('project.show', ['project' => $project]);
    }

    public function memberdel(Request $request)
    {
        $project = Project::find($request->id);
        return view('project.memberdel', ['project' => $project]);
    }

    public function memberremove(Request $request)
    {   
        $project = Project::find($request->id);
        DB::table('project_user')->where('user_id',$request->user_id)->where('project_id',$request->project_id)->delete();
        return view('project.show', ['project' => $project]);
    }

}
