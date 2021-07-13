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
        return redirect('/home');
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
        return redirect('/home');
    }

    public function del(Request $request)
    {
        $team = Team::find($request->id);
        return view('team.del', ['form' => $team]);
    }

    public function remove(Request $request)
    {
        Team::find($request->id)->delete();
        return redirect('/home');
    }

    public function show(Request $request)
    {
        
        $team = Team::find($request->id);
        return view('team.show', ['team' => $team]);
    }
    public function store(Request $request)
    {
        $team = Team::find($request->id);
        return view('team.store', ['team' => $team],['input' => 'メールアドレスを入力']);
    }

    public function search(Request $request)
    {
        $team = Team::find($request->id);
        $user = User::where('email', $request->input)->first();
        return view('team.member', ['team' => $team, 'user' => $user, 'input' => $request->input]);
    }

    public function teamadd(Request $request)
    {   
        $team = Team::find($request->id);
        $param = ['team_id' => $request->team_id, 'user_id' => $request->user_id];
        DB::table('team_user')->insert($param);
        return view('team.show', ['team' => $team]);
    }

    public function memberdel(Request $request)
    {
        $team = Team::find($request->id);
        return view('team.memberdel', ['team' => $team]);
    }

    public function memberremove(Request $request)
    {   
        // DB::table('team_user')->where('user_id',$request->user_id)->delete();
        DB::table('team_user')->where('user_id',$request->user_id)->where('team_id',$request->team_id)->delete();
        return redirect('/home');
    }

}
