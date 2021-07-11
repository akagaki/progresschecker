@extends('layouts.app')

@section('title', 'Task.Add')

@section('menubar')
   {{$project->name}} / 新規タスク作成
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
   <form action="/task/add" method="post">
   <table>
      @csrf
      <input type="hidden" name="project_id" value="{{$project->id}}">
      <input type="hidden" name="user_id" value="{{$user->id}}">
      <input type="hidden" name="progress" value=0>
      <tr><th>タスク名: </th><td><input type="text" 
         name="name"></td></tr>
      <tr><th>詳細: </th><td><input type="text" 
         name="information"></td></tr>
      <tr><th>期日: </th><td><input type="date" 
         name="deadline"></td></tr>
      <tr><th>作成者: </th><td>{{$user->name}}</td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   </form>
   <button> <a href='/project/show?id={{$project->id}}'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection