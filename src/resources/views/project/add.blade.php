@extends('layouts.app')

@section('title', 'Project.Add')

@section('menubar')
   {{$team->name}} / 新規プロジェクト作成
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
   <form action="/project/add" method="post">
   <table>
      @csrf
      <input type="hidden" name="team_id" value="{{$team->id}}">
      <input type="hidden" name="user_id" value="{{$user->id}}">
      <tr><th>プロジェクト名: </th><td><input type="text" 
         name="name"></td></tr>
      <tr><th>詳細: </th><td><input type="text" 
         name="information"></td></tr>
      <tr><th>作成者: </th><td>{{$user->name}}</td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   </form>
   <button> <a href='/team'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection