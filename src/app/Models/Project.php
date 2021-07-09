<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

   public function getData()
   {
       return $this->id . ': ' . $this->name . ' (' . $this->team->name . ')'.' (' . $this->user->name . ')';
   }

   public function team()
    {
    return $this->belongsTo('App\Models\Team');
    }
    
   public function user()
    {
    return $this->belongsTo('App\Models\User');
    }
}
