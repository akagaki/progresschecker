<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $teams = Team::all();
        return view('team.index', ['teams' => $teams]);
    }

   public function add(Request $request)
   {
        $user = Auth::user();   
        return view('team.add',['user' => $user]);
   }

   public function create(Request $request)
    {   
        
        $this->validate($request, Team::$rules);
        $team = new Team;
        $form = $request->all();
        unset($form['_token']);
        $team->fill($form)->save();
        return redirect('/team');
    }

    public function edit(Request $request)
    {
        $team = Team::find($request->id);
        return view('team.edit', ['form' => $team]);
    }

    public function update(Request $request)
    {
        $this->validate($request, Team::$rules);
        $team = Team::find($request->id);
        $form = $request->all();
        unset($form['_token']);
        $team->fill($form)->save();
        return redirect('/team');
    }

    public function del(Request $request)
    {
        $person = Team::find($request->id);
        return view('team.del', ['form' => $person]);
    }

    public function remove(Request $request)
    {
        Team::find($request->id)->delete();
        return redirect('/team');
    }

    public function show(Request $request)
    {
        $team = Team::find($request->id);
        return view('team.show', ['team' => $team]);
    }

    public function find(Request $request)
    {
        return view('team.find',['input' => '']);
    }

    public function search(Request $request)
    {
        $team = Team::where('name', $request->input)->first();
        $param = ['input' => $request->input, 'team' => $team];
        return view('team.find', $param);
    }

}
