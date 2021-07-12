@extends('layouts.app')

@section('title', 'Show')

@section('menubar')
プロジェクト詳細ページ
   <div class="items">
      <a href='/task/add?id={{$project->id}}'><i class="fas fa-plus"></i>NewTask</a>
      <a href='/team/show?id={{$project->team_id}}'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')
<div class="team-box">
         
<!-- Team -->
         <div class="sub-information">
            <p>チーム名：{{$project->ownerTeam()}}</p>  
         </div>
         <div class="main-information">
            <div class="items">
               <a href='/project/store?id={{$project->id}}'><i class="fas fa-plus"></i>NewMember</a>
               <a href='/project/edit?id={{$project->id}}'><i class="fas fa-tools"></i></a>
               <a href='/project/del?id={{$project->id}}'><i class="fas fa-trash-alt"></i></a>
            </div>
         @csrf
            <p>プロジェクト名：{{$project->name}}</p>
            <p>詳細　　：{{$project->information}}</p>
            <p>作成者　：{{$project->ownerName()}}</p>
            <p>作成日　：{{$project->created_at}}</p>
            <p>更新日　：{{$project->updated_at}}</p> 
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