@extends('layouts.app')

@section('title', 'Delete')

@section('menubar')
   削除ページ
@endsection

@section('content')
   <form action="/task/del" method="post">
   <table>
      @csrf
      <input type="hidden" name="id" value="{{$form->id}}">
      <tr><th>タスク名: </th><td>{{$form->name}}</td></tr>
      <tr><th>詳細: </th><td>{{$form->information}}</td></tr>
      <tr><th>進捗: </th><td>{{$form->getProgressString()}}</td></tr>
      <tr><th>期日: </th><td>{{$form->deadline}}</td></tr>
      <tr><th>作成者: </th><td>{{$form->ownerName()}}</td></tr>
      <tr><th></th><td><input type="submit" value="send"></td></tr>
   </table>
   <button> <a href='/task/show?id={{$form->id}}'>戻る</a></button>
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection