@extends('layouts.app')

@section('title', 'Index')

@section('menubar',)
     チーム一覧
     
@endsection

@section('content')
    <!-- TeamTable -->
    <button> <a href='team/add'>新規チーム作成</a></button>
    <button> <a href='team/find'>検索</a></button>
   @foreach ($teams as $team)
   <table>
   <tr>
       <th>チーム名</th><th>詳細</th><th>作成者</th>
   </tr>
       <tr>
           <td><a href='/team/show?id={{$team->id}}'>{{$team->name}}</a></td>
           <td>{{$team->information}}</td>
           <td>{{$team->ownerName()}}</td>
           <!-- <td><button> <a href='/team/edit?id={{$team->id}}'>編集</a></button></td>
           <td><button> <a href='/team/del?id={{$team->id}}'>削除</a></button></td>
           <td><button><a href='project/add?id={{$team->id}}''>新規プロジェクト作成</a></button></td> -->
       </tr>
            <!-- ProjectTable -->
        @if ($team->projects != null)
            @foreach ($team->projects as $project)
                <tr>
                    <th>プロジェクト名</th><th>詳細</th><th>作成者</th>
                </tr>
                    <tr>
                        <td><a href='/project/show?id={{$project->id}}'>{{$project->name}}</a></td>
                        <td>{{$project->information}}</td>
                        <td>{{$project->ownerName()}}</td>
                        <!-- <td><button> <a href='/project/edit?id={{$project->id}}'>編集</a></button></td>
                        <td><button> <a href='/project/del?id={{$project->id}}'>削除</a></button></td>
                        <td><button><a href='task/add?id={{$project->id}}''>新規タスク作成</a></button></td> -->
                    </tr>
                    <!-- TaskTable -->
                    
                    @if ($project->tasks != null)
                    <tr>
                        <th>タスク名</th><th>詳細</th><th>作成者</th><th>進捗</th><th>期日</th><th></th>
                    </tr>
                        @foreach ($project->tasks as $task)
                        <tr>
                            <td>{{$task->name}}</td>
                            <td>{{$task->information}}</td>
                            <td>{{$task->ownerName()}}</td>
                            <td>{{$task->getProgressString()}}</td>
                            <td>{{$task->deadline}}</td>
                            <td>
                                <button> <a href='/task/edit?id={{$task->id}}'>編集</a></button>
                                <button> <a href='/task/del?id={{$task->id}}'>削除</a></button>
                            </td>
                        </tr>
                        @endforeach 
                    @endif
            @endforeach    
        @endif
    </table>
    <supace>　</supace>
   @endforeach
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection