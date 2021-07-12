<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeamUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_user', function (Blueprint $table) {
             $table->unsignedInteger('team_id');
             $table->unsignedInteger('user_id');
             // 複合主キー
             $table->primary(['team_id','user_id']);
            //  外部キー制約
            //  $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
            //  $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_user');
    }
}
