<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;


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
        return redirect('/home');
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
        return redirect('/home');
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

}
