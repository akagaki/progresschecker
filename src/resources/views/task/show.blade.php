@extends('layouts.app')

@section('title', 'Show')

@section('menubar')
{{$task->ownerProject()}}'sタスク 詳細ページ
@endsection

@section('content')
   <table>
   @csrf
      <tr><th>タスク名: </th><td>{{$task->name}}</td></tr>
      <tr><th>詳細: </th><td>{{$task->information}}</td></tr>
      <tr><th>作成者: </th><td>{{$task->ownerName()}}</td></tr>
      <tr><th>進捗: </th><td>{{$task->getProgressString()}}</td></tr>
      <tr><th>期日: </th><td>{{$task->deadline}}</td></tr>
      <tr><th>作成日: </th><td>{{$task->created_at}}</td></tr>
      <tr><th>更新日: </th><td>{{$task->updated_at}}</td></tr>
   </table>
   <button> <a href='/task/edit?id={{$task->id}}'>編集</a></button>
   <button> <a href='/task/del?id={{$task->id}}'>削除</a></button>
   <button> <a href='/project/show?id={{$task->project_id}}'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection