<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index(Request $request)
   {
       $items = DB::table('teams')->get();
       return view('team.index', ['items' => $items]);
   }

   public function post(Request $request)
   {
       $items = DB::select('select * from teams');
       return view('team.index', ['items' => $items]);
   }

   public function add(Request $request)
   {
       return view('team.add');
   }

   public function create(Request $request)
    {
    $param = [
        'name' => $request->name,
        'information' => $request->information,
        'user_id' => $request->user_id,
    ];
    DB::table('teams')->insert($param);
    return redirect('/team');
    }

    public function edit(Request $request)
    {
    $item = DB::table('teams')->where('id', $request->id)->first();
    return view('team.edit', ['form' => $item]);
    }

    public function update(Request $request)
    {
    $param = [
        'id' => $request->id,
        'name' => $request->name,
        'information' => $request->information,
        'user_id' => $request->user_id,
    ];
    DB::table('teams')->where('id', $request->id)->update($param);
    return redirect('/team');
    }

    public function del(Request $request)
    {
    $item = DB::table('teams')
       ->where('id', $request->id)->first();
    return view('team.del', ['form' => $item]);
    }

    public function remove(Request $request)
    {
    DB::table('teams')
        ->where('id', $request->id)->delete();
    return redirect('/team');
    }

    public function show(Request $request)
    {
    $id = $request->id;
    $items = DB::table('teams')->where('id', '<=', $id)->get();
    return view('team.show', ['items' => $items]);
    }

}
