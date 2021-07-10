<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $guarded = array('id');
  
    public static $rules = array(
       'user_id' => 'required',
       'project_id' => 'required',
       'name' => 'required',
       'information' => 'required',
       'progress' => 'required',
       'deadline' => 'required',
   );

   public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function ownerName()
    {
        return $this->user->name;
    }

    public function project()
    {
        return $this->belongsTo('App\Models\Project');
    }

    public function ownerProject()
    {
        return $this->project->id;
    }

    public static $progressNames = [
        '未対応',
        '処理中',
        '処理済',
        '完了',
    ];

}
