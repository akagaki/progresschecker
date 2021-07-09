<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index(Request $request)
   {
       $items = DB::select('select * from teams');
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
       DB::insert('insert into teams (name, information, user_id ) values (:name, :information, :user_id)', $param);
       return redirect('/team');
   }

   public function edit(Request $request)
    {
    $param = ['id' => $request->id];
    $item = DB::select('select * from teams where id = :id', $param);
    return view('team.edit', ['form' => $item[0]]);
    }

    public function update(Request $request)
    {
    $param = [
        'id' => $request->id,
        'name' => $request->name,
        'information' => $request->information,
        'user_id' => $request->user_id,
    ];
    DB::update('update teams set name =:name, information = :information, user_id = :user_id where id = :id', $param);
    return redirect('/team');
    }

    public function del(Request $request)
    {
    $param = ['id' => $request->id];
    $item = DB::select('select * from teams where id = :id', $param);
    return view('team.del', ['form' => $item[0]]);
    }

    public function remove(Request $request)
    {
    $param = ['id' => $request->id];
    DB::delete('delete from teams where id = :id', $param);
    return redirect('/team');
    }

}
