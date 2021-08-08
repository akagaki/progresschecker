@extends('layouts.app')

@section('title', 'タスク詳細')

@section('menubar')
タスク詳細
   <div class="items">
      <!-- <a href='/project/show?id={{$task->project_id}}'><i class="fa fa-reply"></i>	</a> -->
   </div>
@endsection

@section('content')
<div class="team-box">
      <div class="main-conteiner">
            <div class="main-information">
            @csrf
               <p>タスク名：{{$task->name}}</p>
               <p>詳細　　：{{$task->information}}</p>
               <p>作成日　：{{$task->created_at}}</p>
               <p>更新日　：{{$task->updated_at}}</p> 
               <!-- <p>最終更新：{{$task->ownerName()}}</p> -->
            </div>
            <div class="member-information">
                  @foreach($task->users as $member)
                        <p>担当名：{{$member->name}}</p>
                  @endforeach
               <p>進捗　：{{$task->getProgressString()}}</p>
               <p>期日　：{{$task->deadline}}</p>
            </div>
            <div class="member-information">
               <p><a href='/task/memberedit?id={{$task->id}}'><i class="fas fa-plus"></i>担当変更</a></p>
               <p><a href='/task/progressedit?id={{$task->id}}'><i class="fas fa-plus"></i>進捗変更</a></p>
               <p><a href='/task/deadlineedit?id={{$task->id}}'><i class="fas fa-plus"></i>期日変更</a></p>
            </div>
            <div class="main-items">
                  <a href='/task/edit?id={{$task->id}}'><i class="fas fa-tools"></i></a>
                  <a href='/task/del?id={{$task->id}}'><i class="fas fa-trash-alt"></i></a>
            </div>
      </div>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection