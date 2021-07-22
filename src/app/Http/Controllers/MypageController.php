<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class MypageController extends Controller
{   

    public function index(Request $request)
    {
        $user = Auth::user(); 
        $incomplete_count = 0;
        foreach($user->userTasks as $task){
            if($task->progress < 3){
                $incomplete_count += 1;
            }
        }
        
        $sort = $request->sort;
        if($sort != '') {
            $tasks = Auth::user()->userTasks->sortBy($sort);
        } else {
            $tasks = Auth::user()->userTasks;
        }

        return view('mypage.index',['user'=>$user,'taskcount'=>$user->userTasks->count(),'incomplete_count'=>$incomplete_count, 'sort'=>$sort,'tasks'=>$tasks]);
    }
}
