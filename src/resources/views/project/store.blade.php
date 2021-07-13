@extends('layouts.app')

@section('title', 'プロジェクトメンバー登録')

@section('menubar')
プロジェクトメンバー登録
   <div class="items">
      <a href='/project/show?id={{$project->id}}'><i class="fa fa-reply"></i>	</a>
   </div>
   <div class="items">
      <a href='/task/add?id={{$project->id}}'><i class="fas fa-plus"></i>NewTask</a>
   </div>
@endsection

@section('content')
<div class="team-box">
         
<!-- Team -->
         <div class="sub-information">
            <p>チーム名：<a href="/team/show?id={{$project->team_id}}">{{$project->ownerTeam()}}</a></p>
         </div>
<!-- Project -->
<div class="main-conteiner">
         <div class="main-information">
            @csrf
            <p>プロジェクト名：{{$project->name}}</p>
            <p>詳細　　：{{$project->information}}</p>
            <p>作成者　：{{$project->ownerName()}}</p>
            <p>作成日　：{{$project->created_at}}</p>
            <p>更新日　：{{$project->updated_at}}</p> 
         </div>
         <div class="member-information">
            <p>メンバー</p>
            @foreach($project->users as $member)
                     <p>{{$member->name}}</p>
            @endforeach
         </div>
         <div class="member-information">
           <p>{{$project->ownerTeam()}}/メンバー</p>
           @foreach($team->users as $member)
                <form action="/project/store" method="post">
                     @csrf
                     <input type="hidden" name="id" value="{{ $project->id }}">
                     <input type="hidden" name="project_id" value="{{$project->id}}">
                     <input type="hidden" name="user_id" value="{{$member->id}}">   
                     <p>{{$member->name}}　<input type="submit" value="登録"></p>
               </form>
            @endforeach
            
         </div>
         <div class="main-items">
            <a href='/project/edit?id={{$project->id}}'><i class="fas fa-tools"></i></a>
            <a href='/project/del?id={{$project->id}}'><i class="fas fa-trash-alt"></i></a>
         </div>
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
    </div>

@endsection

@section('footer')
copyright 2021 akagaki.
@endsection