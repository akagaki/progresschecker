@extends('layouts.app')

@section('title', 'Myページ')

@section('menubar')
Myページ
   <div class="items">
      <a href='/home'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')
<div class="team-box">
<!-- User -->
   <div class="main-conteiner">
         <div class="main-information">
            <p>名前：{{$user->name}}</p>
            <p>Mail：{{$user->email}}</p>
         </div>
         <div class="member-information">
            <p>チーム</p>
               @foreach ($user->userTeams as $team)
                  <p><a href='/team/show?id={{$team->id}}'>{{$team->name}}</a></p>
               @endforeach  
         </div>
         <div class="member-information">
            <p>プロジェクト</p>
               @foreach($user->userProjects as $project)
                  <p><a href='/project/show?id={{$project->id}}'>{{$project->name}}</a>({{$project->ownerTeam()}})</p>
               @endforeach
         </div>
         <div class="member-information">
            <p>タスク　（未完了{{$incomplete_count}}/{{$taskcount}}）</p>
               @foreach($user->userTasks as $task)
                  <p><a href='/task/show?id={{$task->id}}'>{{$task->name}}</a>({{$task->ownerProject()}})</p>
               @endforeach
         </div>
  </div>
      <p>タスクボード</p>
      <p class='sort-items'>
         <i class="fas fa-filter"></i>
            <a href="/mypage?sort=created_at">作成順</a>
            <a href="/mypage?sort=updated_at">更新順</a>
            <a href="/mypage?sort=deadline">期日順</a>
      </p>
   <div class="task-box">
            <div class="card-container"> 未対応
                @foreach ($tasks as $task)
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
                @foreach ($tasks as $task)
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
                @foreach ($tasks as $task)
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
                @foreach ($tasks as $task)
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
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection