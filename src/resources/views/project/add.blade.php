@extends('layouts.helloapp')

@section('title', 'Project.Add')

@section('menubar')
   新規プロジェクト作成
@endsection

@section('content')
   <form action="/project/add" method="post">
   <table>
      @csrf
      <tr><th>チームID: </th><td><input type="number" 
         name="team_id"></td></tr>
      <tr><th>ユーザーID: </th><td><input type="number" 
         name="user_id"></td></tr>
      <tr><th>プロジェクト名: </th><td><input type="text" 
         name="name"></td></tr>
      <tr><th>詳細: </th><td><input type="text" 
         name="information"></td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection