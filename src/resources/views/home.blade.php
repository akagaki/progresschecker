@extends('layouts.app')

@section('title', 'home')

@section('menubar',)
    ダッシュボード
    <div class="items">
        <a href=''><i class="fas fa-search">Search</i></a>
    </div>
    <div class="items">
        <a href='team/add'><i class="fas fa-plus">NewTeam</i></a>
    </div>
@endsection

@section('content')
    
   @foreach ($teams as $team)
     <div class="team-box">
<!-- Team -->
<div class="main-conteiner">
    <div class="main-information">
        <p>チーム名：<a href='/team/show?id={{$team->id}}'>{{$team->name}}</a></p>
    </div>
</div>

<!-- Project -->
        @if ($team->projects != null)
            @foreach ($team->projects as $project)
            <div class="sub-information">
                <p>プロジェクト名：<a href='/project/show?id={{$project->id}}'>{{$project->name}}</a></p>
            </div>
<!-- Task -->
             @if ($project->tasks != null)
             <p>タスクボード</p>
             <div class="task-box">
                <div class="card-container"> 未対応
                @foreach ($project->tasks as $task)
                    @if ($task->progress ==0)
                        <div class="card-item">
                            <a href="/task/show?id={{$task->id}}">
                                <p>タスク名：{{$task->name}}</p>
                                <p>詳細：{{$task->information}}</p>
                                @foreach($task->users as $member)
                                        <p>担当名：{{$member->name}}</p>
                                @endforeach
                                <p>進捗：{{$task->getProgressString()}}</p>
                                <p>期日：{{$task->deadline}}</p>
                            </a>
                        </div>
                    @endif
                @endforeach 
                </div>
                <div class="card-container"> 対応中
                @foreach ($project->tasks as $task)
                    @if ($task->progress ==1)
                        <div class="card-item">
                            <a href="/task/show?id={{$task->id}}">
                                <p>タスク名：{{$task->name}}</p>
                                <p>詳細：{{$task->information}}</p>
                                @foreach($task->users as $member)
                                        <p>担当名：{{$member->name}}</p>
                                @endforeach
                                <p>進捗：{{$task->getProgressString()}}</p>
                                <p>期日：{{$task->deadline}}</p>
                            </a>
                        </div>
                    @endif
                @endforeach 
                </div>
                <div class="card-container"> 対応済
                @foreach ($project->tasks as $task)
                    @if ($task->progress ==2)
                        <div class="card-item">
                            <a href="/task/show?id={{$task->id}}">
                                <p>タスク名：{{$task->name}}</p>
                                <p>詳細：{{$task->information}}</p>
                                @foreach($task->users as $member)
                                        <p>担当名：{{$member->name}}</p>
                                @endforeach
                                <p>進捗：{{$task->getProgressString()}}</p>
                                <p>期日：{{$task->deadline}}</p>
                            </a>
                        </div>
                    @endif
                @endforeach 
                </div>
                <div class="card-container"> 完了
                @foreach ($project->tasks as $task)
                    @if ($task->progress ==3)
                        <div class="card-item">
                            <a href="/task/show?id={{$task->id}}">
                                <p>タスク名：{{$task->name}}</p>
                                <p>詳細：{{$task->information}}</p>
                                @foreach($task->users as $member)
                                        <p>担当名：{{$member->name}}</p>
                                @endforeach
                                <p>進捗：{{$task->getProgressString()}}</p>
                                <p>期日：{{$task->deadline}}</p>
                            </a>
                        </div>
                    @endif
                @endforeach 
                </div>
            </div> 
            @endif
            @endforeach    
        @endif
    </div>
   @endforeach
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection