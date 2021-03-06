<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function teams()
    {
    return $this->hasMany('App\Models\Team');
    }
    public function userTeams()
    {
        return $this->belongsToMany('App\Models\Team');
    }
    public function userProjects()
    {
        return $this->belongsToMany('App\Models\Project');
    }
    public function userTasks()
    {
        return $this->belongsToMany('App\Models\Task');
    }
    public function sortedTasks($sort)
    {
        return $this->userTasks->sortBy($sort);
    }

    public function getCreatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }
    public function getUpdatedAtAttribute($value)
    {   
        return Carbon::parse($value)->isoFormat('YYYY年MM月DD日(ddd)');
    }

}
