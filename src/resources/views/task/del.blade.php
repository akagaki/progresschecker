@extends('layouts.app')

@section('title', 'タスク削除')

@section('menubar')
   タスク削除
<div class="items">
   <!-- <a href='/task/show?id={{$task->id}}'><i class="fa fa-reply"></i>	</a> -->
</div>
@endsection

@section('content')
<div class="team-box">
   <form action="/task/del" method="post">
   <div class="main-conteiner">
               <div class="main-information">
               @csrf
               <input type="hidden" name="project_id" value="{{$task->project_id}}">
               <input type="hidden" name="id" value="{{$task->id}}">
               <p>タスク名：{{$task->name}}</p>
               <p>詳細　　：{{$task->information}}</p>
               <p>作成日　：{{$task->created_at}}</p>
               <p>更新日　：{{$task->updated_at}}</p> 
               <!-- <p>最終更新：{{$task->ownerName()}}</p> -->
            </div>
            <div class="member-information">
                  @foreach($task->users as $member)
                        <p>担当名：{{$member->name}}</p>
                  @endforeach
               <p>進捗　：{{$task->getProgressString()}}</p>
               <p>期日　：{{$task->deadline}}</p>
            </div>
            <div class="member-information">
               <p>※一度削除すると元に戻すことはできません。</p> 本当に削除しますか？　
               <input type="submit" value="削除">
            </div>
   </div>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection

