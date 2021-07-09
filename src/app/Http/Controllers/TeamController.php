<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index(Request $request)
    {
        $items = Team::all();
        return view('team.index', ['items' => $items]);
    }

   public function post(Request $request)
   {
       $items = Team::all();
       return view('team.index', ['items' => $items]);
   }

   public function add(Request $request)
   {
       return view('team.add');
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
    $id = $request->id;
    $items = DB::table('teams')->where('id', '<=', $id)->get();
    return view('team.show', ['items' => $items]);
    }

    public function find(Request $request)
    {
    return view('team.find',['input' => '']);
    }

    public function search(Request $request)
    {
    $item = Team::where('name', $request->input)->first();
    $param = ['input' => $request->input, 'item' => $item];
    return view('team.find', $param);
    }

}
