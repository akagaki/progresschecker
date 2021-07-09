@extends('layouts.helloapp')

@section('title', 'Edit')

@section('menubar')
   更新ページ
@endsection

@section('content')
   <form action="/team/edit" method="post">
   <table>
      @csrf
      <input type="hidden" name="id" value="{{$form->id}}">
      <tr><th>name: </th><td><input type="text" name="name" 
         value="{{$form->name}}"></td></tr>
      <tr><th>詳細: </th><td><input type="text" name="information" 
         value="{{$form->information}}"></td></tr>
      <tr><th>作成者: </th><td><input type="text" name="user_id" 
         value="{{$form->user_id}}"></td></tr>
      <tr><th></th><td><input type="submit" 
         value="send"></td></tr>
   </table>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection