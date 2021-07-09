@extends('layouts.helloapp')

@section('title', 'Delete')

@section('menubar')
   削除ページ
@endsection

@section('content')
   <form action="/team/del" method="post">
   <table>
      @csrf
      <input type="hidden" name="id" value="{{$form->id}}">
      <tr><th>チーム名: </th><td>{{$form->name}}</td></tr>
      <tr><th>詳細: </th><td>{{$form->information}}</td></tr>
      <tr><th>作成者: </th><td>{{$form->user_id}}</td></tr>
      <tr><th></th><td><input type="submit" value="send"></td></tr>
   </table>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection
