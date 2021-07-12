<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    protected $guarded = array('id');

    public static $rules = array(
        'name' => 'required',
        'information' => 'required',
        'user_id' => 'required'
    );


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

    public function userConnect()
    {
        return $this->belongsToMany('App\Models\User');
    }

}

