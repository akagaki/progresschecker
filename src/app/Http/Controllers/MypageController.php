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
        return view('mypage.index',['user'=>$user]);
    }
}
