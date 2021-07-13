@extends('layouts.app')

@section('title', 'メンバー登録')

@section('menubar')
   チームメンバー登録
   <div class="items">
      <a href='/team/show?id={{$team->id}}'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')
<div class="team-box">
           
<!-- Team -->
   <div class="main-conteiner">
         <div class="main-information">
            <p>チーム名：{{$team->name}}</p>
            <p>詳細　　：{{$team->information}}</p>
            <p>作成者　：{{$team->ownerName()}}</p>
            <p>作成日　：{{$team->created_at}}</p>
            <p>更新日　：{{$team->updated_at}}</p>      
          </div>
          <div class="member-information">
            <p>メンバー</p> 
            @foreach($team->users as $member)
            <p>{{$member->name}}</p>
            @endforeach
         </div>
          <div class="member-information">
            <p>ユーザー検索</p>
            <form action="/team/store" method="post">
                  @csrf
                  <input type="hidden" name="id" value="{{ $team->id }}">
                  <input type="text" name="input" value="{{$input}}">
                  <input type="submit" value="検索">
            </form>
         </div>
         <div class="main-items">
               <a href='/team/edit?id={{$team->id}}'><i class="fas fa-tools"></i></a>
               <a href='/team/del?id={{$team->id}}'><i class="fas fa-trash-alt"></i></a>
         </div>
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