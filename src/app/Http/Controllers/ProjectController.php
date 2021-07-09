<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $items = Project::all();
        return view('project.index', ['items' => $items]);
    }

    public function add(Request $request)
    {
        return view('project.add');
    }

    public function create(Request $request)
    {
        $this->validate($request, Project::$rules);
        $board = new Project();
        $form = $request->all();
        unset($form['_token']);
        $board->fill($form)->save();
        return redirect('/team');
    }
}
