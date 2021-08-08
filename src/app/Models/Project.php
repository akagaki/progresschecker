<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Project extends Model
{
    use HasFactory;

    protected $guarded = array('id');
  
    public static $rules = array(
       'user_id' => 'required',
       'team_id' => 'required',
       'name' => 'required',
       'information' => 'required'
   );

   public static function boot()
    {
        parent::boot();

        static::deleting(function ($model) {
            foreach($model->tasks()->get() as $task){
                $task->delete();
            }
        });
    }

    public function getCreatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }
    public function getUpdatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }

    public function tasks()
    {
        return $this->hasMany('App\Models\Task');
    }

   

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function ownerName()
    {
        return $this->user->name;
    }

    public function team()
    {
        return $this->belongsTo('App\Models\Team');
    }

    public function ownerTeam()
    {
        return $this->team->name;
    }
    public function ownerTeamId()
    {
        return $this->team->id;
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }


}
