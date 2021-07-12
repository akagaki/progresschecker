@extends('layouts.app')

@section('title', 'Show')

@section('menubar')
   チーム詳細ページ
   <div class="items">
      <a href='/project/add?id={{$team->id}}''><i class="fas fa-plus"></i>NewProject</a>
   </div>
@endsection

@section('content')


     <div class="team-box">
                  <div class="items">
                     <a href='/team/store?id={{$team->id}}'><i class="fas fa-plus"></i>NewMember</a>
                     <a href='/team/edit?id={{$team->id}}'><i class="fas fa-tools"></i></a>
                     <a href='/team/del?id={{$team->id}}'><i class="fas fa-trash-alt"></i></a>
                  </div>
<!-- Team -->
            <div class="main-information">
               <p>チーム名：{{$team->name}}</p>
               <p>詳細　　：{{$team->information}}</p>
               <p>作成者　：{{$team->ownerName()}}</p>
               <p>作成日　：{{$team->created_at}}</p>
               <p>更新日　：{{$team->updated_at}}</p>      
             </div>
<!-- Project -->
        @if ($team->projects != null)
            @foreach ($team->projects as $project)
               <div class="sub-information">
                  <p>プロジェクト名：<a href='/project/show?id={{$project->id}}'>{{$project->name}}</a></p>
                  <p>詳細：{{$project->information}}</p>
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
            @endforeach    
        @endif
    </div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection