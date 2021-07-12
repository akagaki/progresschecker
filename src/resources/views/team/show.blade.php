@extends('layouts.app')

@section('title', 'Show')

@section('menubar')
   詳細ページ
@endsection

@section('content')
   <table>
      @csrf
      <tr><th>チーム名: </th><td>{{$team->name}}</td></tr>
      <tr><th>詳細: </th><td>{{$team->information}}</td></tr>
      <tr><th>作成者: </th><td>{{$team->ownerName()}}</td></tr>
      <tr><th>作成日: </th><td>{{$team->created_at}}</td></tr>
      <tr><th>更新日: </th><td>{{$team->updated_at}}</td></tr>
   </table>
   <button> <a href='/team/edit?id={{$team->id}}'>編集</a></button>
   <button> <a href='/team/del?id={{$team->id}}'>削除</a></button>
   <table>
      <tr><th>プロジェクト名</th><th>タスク名</th></tr>    
         @if ($team->projects != null)
               @foreach ($team->projects as $project)
               <tr>
                  <td><a href='/project/show?id={{$project->id}}'>{{$project->name}}</a></td>
                     @if($project->tasks != null)
                        @foreach ($project->tasks as $task)
                           <td>{{$task->name}}</td>
                        @endforeach
                     @endif
               </tr>
               @endforeach    
         @endif
   </table>
   <button><a href='/project/add?id={{$team->id}}''>新規プロジェクト作成</a></button>
   <button> <a href='/home'>戻る</a></button>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection