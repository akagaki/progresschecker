@extends('layouts.app')

@section('title', '新規タスク作成')

@section('menubar')
   新規タスク作成
      <div class="items">
         <a href='/project/show?id={{$project->id}}'><i class="fa fa-reply"></i></a>
      </div>
@endsection

@section('content')
   @if (count($errors) > 0)
   <div>
       <ul>
           @foreach ($errors->all() as $error)
               <li>{{ $error }}</li>
           @endforeach
       </ul>
   </div>
   @endif
<div class="team-box">
         <div class="sub-information">
            <p>プロジェクト名：<a href="/project/show?id={{$project->id}}">{{$project->name}}</a></p>
         </div>
 <form action="/task/add" method="post">
   <div class="main-information">
            @csrf
            <input type="hidden" name="project_id" value="{{$project->id}}">
            <input type="hidden" name="user_id" value="{{$user->id}}">
            <input type="hidden" name="progress" value=0>
            <p>タスク名：<input type="text" name="name" value="{{old('name')}}"></p>
            <p>詳細　　：<input type="text" name="information" value="{{old('information')}}"></p>
            <p>担当者　：
               <select name="member_id">
                  @foreach($project->users as $member)
                     <option value="{{$member->id}}">{{$member->name}}</option>
                  @endforeach
               </select>
            </p>
            <p>期日　　：<input type="date" name="deadline"></p>
            <p>作成者　：{{$user->name}}</p>
            <input type="submit" value="新規作成">
        </div>
   </form>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection