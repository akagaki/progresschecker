@extends('layouts.app')

@section('title', 'Show')

@section('menubar')
{{$project->ownerTeam()}}'sプロジェクト 詳細ページ
@endsection

@section('content')
   <table>
   @csrf
      <tr><th>プロジェクト名: </th><td>{{$project->name}}</td></tr>
      <tr><th>詳細: </th><td>{{$project->information}}</td></tr>
      <tr><th>作成者: </th><td>{{$project->ownerName()}}</td></tr>
      <tr><th>作成日: </th><td>{{$project->created_at}}</td></tr>
      <tr><th>更新日: </th><td>{{$project->updated_at}}</td></tr>
   </table>
   <button> <a href='/project/edit?id={{$project->id}}'>編集</a></button>
   <button> <a href='/project/del?id={{$project->id}}'>削除</a></button>
   <table>
      <tr><th>タスク名</th><th>進捗</th><th>期日</th></tr>    
         @if ($project->tasks != null)
               @foreach ($project->tasks as $task)
               <tr>
                  <td><a href='/task/show?id={{$task->id}}'>{{$task->name}}</a></td>
                  <td>{{$task->getProgressString()}}</td>
                  <td>{{$task->deadline}}</td>
               </tr>
               @endforeach    
         @endif
   </table>
   <button><a href='/task/add?id={{$project->id}}''>新規タスク作成</a></button>
   <button> <a href='/team/show?id={{$project->team_id}}'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection