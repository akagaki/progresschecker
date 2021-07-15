@extends('layouts.app')

@section('title', 'タスク担当変更')

@section('menubar')
   タスク担当変更
<div class="items">
   <a href='/task/show?id={{$task->id}}'><i class="fa fa-reply"></i>	</a>
</div>
@endsection

@section('content')
<div class="team-box">
<!-- Project -->
   <div class="sub-information">
      <p>プロジェクト名：<a href="/project/show?id={{$task->project_id}}">{{$task->ownerProject()}}</a></p>
   </div>
<!-- Task -->
   @if (count($errors) > 0)
   <div>
       <ul>
           @foreach ($errors->all() as $error)
               <li>{{ $error }}</li>
           @endforeach
       </ul>
   </div>
   @endif
   <form action="/task/memberedit" method="post">
      <div class="main-conteiner">
               <div class="main-information">
               @csrf
                  <input type="hidden" name="id" value="{{$task->id}}">
                  <input type="hidden" name="user_id" value="{{$user->id}}">
                  <input type="hidden" name="project_id" value="{{$task->project_id}}">
                  <input type="hidden" name="name" value="{{$task->name}}">
                  <input type="hidden" name="information" value="{{$task->information}}">
                  <input type="hidden" name="progress" value="{{$task->progress}}">
                  <input type="hidden" name="deadline" value="{{$task->deadline}}">
                  <p>タスク名：{{$task->name}}</p>
                  <p>詳細　　：{{$task->information}}</p>
                  <p>作成日　：{{$task->created_at}}</p>
                  <p>更新日　：{{$task->updated_at}}</p> 
                  <p>最終更新：{{$task->ownerName()}}</p>
               </div>
               <div class="member-information">
               <p>担当者　：
               <select name="member_id">
                  @foreach($task->users as $member)
                    <option value="{{$member->id}}">{{$member->name}}</option>
                  @endforeach
                  @foreach($project->users as $member)
                     <option value="{{$member->id}}">{{$member->name}}
                  @endforeach
               </select>
               </p>
               <p>進捗　　：{{$task->getProgressString()}}</p>
               <p>期日　　：{{$task->deadline}}</p>
               
               
               </div>
               <div class="member-information">
               <input type="submit" value="編集">
                <p><a href='/task/progressedit?id={{$task->id}}'><i class="fas fa-plus"></i>進捗変更</a></p>
                <p><a href='/task/deadlineedit?id={{$task->id}}'><i class="fas fa-plus"></i>期日変更</a></p>
              </div>
              <div class="main-items">
                    <a href='/task/edit?id={{$task->id}}'><i class="fas fa-tools"></i></a>
                    <a href='/task/del?id={{$task->id}}'><i class="fas fa-trash-alt"></i></a>
              </div>
      </div>
   </form>
</div>  
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection