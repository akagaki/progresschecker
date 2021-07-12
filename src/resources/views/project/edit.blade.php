@extends('layouts.app')

@section('title', 'Edit')

@section('menubar')
   プロジェクト編集ページ
   <div class="items">
      <a href='/project/show?id={{$form->id}}'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')
   @if (count($errors) > 0)
   <div>
       <ul>
           @foreach ($errors->all() as $error)
               <li>{{ $error }}</li>
           @endforeach
       </ul>
   </div>
   @endif
<div class="team-box">
   <form action="/project/edit" method="post">
         <div class="main-information">
            @csrf
            <input type="hidden" name="id" value="{{$form->id}}">
            <input type="hidden" name="user_id" value="{{$form->user_id}}">
            <input type="hidden" name="team_id" value="{{$form->team_id}}">
            <p>プロジェクト名：<input type="text" name="name" value="{{$form->name}}"></p>
            <p>詳細　　：<input type="text" name="information" value="{{$form->information}}"></p>
            <p>作成者　：{{$form->ownerName()}}</p>
            <p>作成日　：{{$form->created_at}}</p>
            <p>更新日　：{{$form->updated_at}}</p> 
            <input type="submit" value="編集">
         </div> 
   </form>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection