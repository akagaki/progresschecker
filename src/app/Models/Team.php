<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Team extends Model
{
    use HasFactory;

    protected $guarded = array('id');

    public static $rules = array(
        'name' => 'required',
        'information' => 'required',
        'user_id' => 'required'
    );

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($model) {
            foreach($model->projects()->get() as $project){
                $project->delete();
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



    public function getData()
    {
       return $this->id . ': ' . $this->name ;
    }

    public function projects()
    {
    return $this->hasMany('App\Models\Project');
    }

    public function user()
    {
    return $this->belongsTo('App\Models\User');
    }

    public function ownerName()
    {
        return $this->user->name;
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User');
    }

    

}

