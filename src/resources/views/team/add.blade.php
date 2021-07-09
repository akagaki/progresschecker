@extends('layouts.helloapp')

@section('title', 'Add')

@section('menubar',)
   新規作成
@endsection

@section('content')
   <form action="/team/add" method="post">
   <table>
      @csrf
      <tr><th>チーム名: </th><td><input type="text" name="name"></td></tr>
      <tr><th>詳細: </th><td><input type="text" name="information"></td></tr>
      <tr><th>作成者: </th><td><input type="text" name="user_id"></td></tr>
      <tr><th></th><td><input type="submit" value="send"></td></tr>
   </table>
   </form>
   <button> <a href='/team'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection