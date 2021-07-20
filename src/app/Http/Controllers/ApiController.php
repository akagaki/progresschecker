<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResource;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Team;
use App\Models\Project;
use App\Models\Task;

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
    public function update(Request $request, $id)
    {
        //
    }

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
