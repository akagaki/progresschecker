<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


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
//    日付表示を変更
   public function getCreatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }
   public function getUpdatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }
   public function getDeadlineAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }

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
        return $this->project->name;
    }

    public function ownerProjectId()
    {
        return $this->project->id;
    }



    public function getProgressString(){
        switch($this->progress){
        case 0:
            return "未対応";
        case 1:
            return "対応中";
        case 2:
            return "対応済";
        case 3:
            return "完了";
        }
  }

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }
    public function getUserId()
    {
        return $this->belongsToMany('App\Models\User','task_user','task_id','user_id')->withPivot('user_id');
    }


}
