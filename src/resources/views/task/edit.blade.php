@extends('layouts.app')

@section('title', 'Edit')

@section('menubar')
   タスク更新ページ
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
   <form action="/task/edit" method="post">
      <div class="main-conteiner">
               <div class="main-information">
               @csrf
                  <input type="hidden" name="id" value="{{$task->id}}">
                  <input type="hidden" name="user_id" value="{{$user->id}}">
                  <input type="hidden" name="project_id" value="{{$task->project_id}}">
                  <p>タスク名：<input type="text" name="name" value="{{$task->name}}"></p>
                  <p>詳細　　：<input type="text" name="information" value="{{$task->information}}"></p>
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
                     <option value="{{$member->id}}">{{$member->name}}</option>
                  @endforeach
               </select>
               </p>
               <p>進捗　　：
                  <select name="progress">
                     <option value="{{$task->progress}}">{{$task->getProgressString()}}</option>
                     <option value=0>未対応</option>
                     <option value=1>対応中</option>
                     <option value=2>対応済</option>
                     <option value=3>完了</option>
                  </select>
               </p>
               <p>期日　　：<input type="date" name="deadline" value="{{$task->deadline}}"></p>
               <input type="submit" value="編集">
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
   </form>
</div>  
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection